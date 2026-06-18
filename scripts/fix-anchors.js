// Scans all headers mapping English anchors to their localized versions
// handling NFD normalization and .html links; notifies when invalid link anchor is found.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(root, "docs");
const sourceLang = "en";
const l10ns = ["en", "ja", "zh"];

const linkPattern = /(!?\[[^\n]+?])\(([^)\n]+)\)/g;
const controlCharacters = /[\u0000-\u001f]/g;
const combiningMarks = /[\u0300-\u036f]/g;
const specialCharacters = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'\u201c\u201d\u2018\u2019<>,.?/]+/g;

const langRoots = Object.fromEntries(l10ns.map(lang => [lang, join(docsRoot, lang)]));
const files = l10ns.flatMap(lang => getMarkdownFiles(langRoots[lang]).map(path => ({
    lang,
    path,
    relativePath: slash(relative(langRoots[lang], path)),
    reportPath: slash(relative(root, path))
})));

const indexes = buildIndexes();
const localizedSlugs = buildLocalizedSlugMaps(indexes);
const fixed = [];
const unresolved = [];

for (const file of files) {
    const original = readFile(file.path);
    const analyzed = analyzeFile(original.content, file);

    if (analyzed.content !== original.content) {
        writeFileSync(file.path, `${original.bom ? "\uFEFF" : ""}${analyzed.content}`, "utf8");
    }
}

report();

function analyzeFile(content, file) {
    let inFence = null;
    let lineNumber = 0;

    const parts = content.split(/(\r?\n)/);
    for (let i = 0; i < parts.length; i += 2) {
        lineNumber++;
        const line = parts[i];
        const fence = updateFence(line, inFence);
        inFence = fence.state;
        if (fence.isFence) continue;

        if (inFence) continue;

        parts[i] = line.replace(linkPattern, (match, text, rawDestination) => {
            if (text.startsWith("!")) return match;

            const parsed = parseLinkDestination(rawDestination);
            if (!parsed) return match;

            const result = analyzeDestination(parsed.destination, file);
            if (!result) return match;

            const entry = {
                file: file.reportPath,
                line: lineNumber,
                before: parsed.destination,
                ...result
            };

            if (result.fixedDestination) {
                fixed.push(entry);
                return `${text}(${formatLinkDestination(parsed, result.fixedDestination)})`;
            }

            unresolved.push(entry);
            return match;
        });
    }

    return { content: parts.join("") };
}

function analyzeDestination(destination, currentFile) {
    const hashIndex = destination.indexOf("#");
    if (hashIndex < 0) return null;

    const pathPart = destination.slice(0, hashIndex);
    const anchor = destination.slice(hashIndex + 1);
    if (!anchor || isExternal(pathPart)) return null;

    const target = resolveTarget(pathPart, currentFile);
    if (!target) return null;

    const targetIndex = indexes[target.lang].get(target.relativePath);
    if (!targetIndex) {
        return {
            kind: "missing-target",
            target: `${target.lang}/${target.relativePath}`
        };
    }

    const existing = findExistingSlug(anchor, targetIndex);
    if (existing) {
        return existing === anchor ? null : {
            kind: "normalized-anchor",
            target: `${target.lang}/${target.relativePath}`,
            fixedDestination: `${target.outputPath}#${existing}`
        };
    }

    const localized = findLocalizedSlug(anchor, target);
    if (localized) {
        return {
            kind: "localized-anchor",
            target: `${target.lang}/${target.relativePath}`,
            fixedDestination: `${target.outputPath}#${localized}`
        };
    }

    return {
        kind: "missing-anchor",
        target: `${target.lang}/${target.relativePath}`,
        anchor
    };
}

function findExistingSlug(anchor, targetIndex) {
    for (const candidate of anchorCandidates(anchor)) {
        const existing = targetIndex.slugLookup.get(candidate);
        if (existing) return existing;
    }

    return null;
}

function findLocalizedSlug(anchor, target) {
    const map = localizedSlugs[target.lang].get(target.relativePath);
    if (!map) return null;

    for (const candidate of anchorCandidates(anchor)) {
        const localized = map.get(candidate);
        if (localized) return localized;
    }

    return null;
}

function buildIndexes() {
    return Object.fromEntries(l10ns.map(lang => {
        const filesForLang = files.filter(file => file.lang === lang);
        const index = new Map();

        for (const file of filesForLang) {
            const anchors = extractAnchors(readFile(file.path).content);
            const slugs = new Set(anchors.map(anchor => anchor.slug));
            index.set(file.relativePath, {
                anchors,
                slugLookup: buildSlugLookup(slugs)
            });
        }

        return [lang, index];
    }));
}

function buildLocalizedSlugMaps(allIndexes) {
    const maps = Object.fromEntries(l10ns.map(lang => [lang, new Map()]));
    const sourceIndex = allIndexes[sourceLang];

    for (const lang of l10ns) {
        for (const [relativePath, source] of sourceIndex) {
            const target = allIndexes[lang].get(relativePath);
            if (!target) continue;

            if (lang !== sourceLang && source.anchors.length !== target.anchors.length) {
                console.warn(`[skip] ${lang}/${relativePath}: heading count differs from ${sourceLang}/${relativePath}`);
                continue;
            }

            maps[lang].set(relativePath, new Map(source.anchors.map((anchor, index) => [
                anchor.slug,
                target.anchors[index].slug
            ])));
        }
    }

    return maps;
}

function resolveTarget(pathPart, currentFile) {
    if (pathPart === "" || pathPart === ".") {
        return {
            lang: currentFile.lang,
            relativePath: currentFile.relativePath,
            outputPath: pathPart
        };
    }

    let outputPath = stripHtmlExtension(pathPart);

    if (!pathPart.startsWith("/")) {
        return {
            lang: currentFile.lang,
            relativePath: toMarkdownPath(posix.normalize(posix.join(posix.dirname(currentFile.relativePath), outputPath))),
            outputPath
        };
    }

    let targetLang = currentFile.lang;
    let cleanPath = outputPath.slice(1);

    for (const lang of l10ns) {
        if (cleanPath === lang || cleanPath.startsWith(`${lang}/`)) {
            targetLang = lang;
            cleanPath = cleanPath.slice(lang.length).replace(/^\//, "");
            break;
        }
    }

    return {
        lang: targetLang,
        relativePath: toMarkdownPath(cleanPath),
        outputPath
    };
}

function extractAnchors(content) {
    const anchors = [];
    const used = new Set();
    let inFence = null;

    for (const line of content.split(/\r?\n/)) {
        const fence = updateFence(line, inFence);
        inFence = fence.state;
        if (fence.isFence) continue;

        if (inFence) continue;

        const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
        if (!heading) continue;

        const title = stripHeadingMarkup(heading[2]);
        anchors.push({ title, slug: uniqueSlug(slugify(title), used) });
    }

    return anchors;
}

function report() {
    if (fixed.length === 0 && unresolved.length === 0) {
        console.log("No anchor issues found.");
        return;
    }

    if (fixed.length > 0) {
        console.log(`Fixed ${fixed.length} anchor issue${fixed.length === 1 ? "" : "s"}:`);
        printLines(fixed, item => `${item.file}:${item.line} ${item.before} -> ${item.fixedDestination}`);
    }

    if (unresolved.length > 0) {
        console.error(`Could not auto-fix ${unresolved.length} anchor issue${unresolved.length === 1 ? "" : "s"}:`);
        printLines(unresolved, item => `${item.file}:${item.line} ${formatError(item)}`, console.error);
        process.exitCode = 1;
    }
}

function printLines(items, format, write = console.log) {
    for (const item of items) write(format(item));
}

function formatError(item) {
    if (item.kind === "missing-target") return `missing target ${item.target}`;
    return `missing #${item.anchor} in ${item.target}`;
}

function updateFence(line, state) {
    const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (!fence) return { state, isFence: false };

    const marker = fence[1];
    if (!state) return { state: { char: marker[0], length: marker.length }, isFence: true };
    if (marker[0] === state.char && marker.length >= state.length) return { state: null, isFence: true };
    return { state, isFence: true };
}

function anchorCandidates(anchor) {
    const candidates = new Set([anchor]);

    try {
        candidates.add(decodeURIComponent(anchor));
    }
    catch {
        // Keep the raw anchor when it is not valid URI-encoded text.
    }

    for (const candidate of [...candidates]) {
        candidates.add(candidate.toLowerCase());
        candidates.add(candidate.normalize("NFC"));
        candidates.add(candidate.normalize("NFKD"));
        candidates.add(candidate.normalize("NFKD").toLowerCase());
    }

    return candidates;
}

function buildSlugLookup(slugs) {
    const lookup = new Map();

    for (const slug of slugs) {
        for (const candidate of anchorCandidates(slug)) {
            if (!lookup.has(candidate)) lookup.set(candidate, slug);
        }
    }

    return lookup;
}

function stripHeadingMarkup(heading) {
    return heading.replace(/\s+#+\s*$/, "").replace(/!\[([^\n]*?)]\([^)]+\)/g, "$1").replace(/\[([^\n]+?)]\([^)]+\)/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/(\*\*|__)(.*?)\1/g, "$2").replace(/([*_])(.*?)\1/g, "$2").replace(/<[^>]+>/g, "").trim();
}

function slugify(value) {
    return value.normalize("NFKD").replace(combiningMarks, "").replace(controlCharacters, "").replace(specialCharacters, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();
}

function uniqueSlug(slug, used) {
    let candidate = slug;
    let index = 1;

    while (used.has(candidate)) candidate = `${slug}-${index++}`;

    used.add(candidate);
    return candidate;
}

function parseLinkDestination(rawDestination) {
    const match = rawDestination.match(/^(\s*)(<[^>]*>|\S+)([\s\S]*)$/);
    if (!match) return null;

    const [, prefix, raw, suffix] = match;
    const angled = raw.startsWith("<") && raw.endsWith(">");
    return {
        prefix,
        suffix,
        angled,
        destination: angled ? raw.slice(1, -1) : raw
    };
}

function formatLinkDestination(parsed, destination) {
    const rawDestination = parsed.angled ? `<${destination}>` : destination;
    return `${parsed.prefix}${rawDestination}${parsed.suffix}`;
}

function isExternal(pathPart) {
    return /^[a-z][a-z0-9+.-]*:/i.test(pathPart) || pathPart.startsWith("//");
}

function toMarkdownPath(targetPath) {
    if (targetPath.endsWith("/")) return `${targetPath}index.md`;
    if (targetPath.endsWith(".md")) return targetPath;
    return `${targetPath}.md`;
}

function stripHtmlExtension(targetPath) {
    return targetPath.endsWith(".html") ? targetPath.slice(0, -".html".length) : targetPath;
}

function getMarkdownFiles(dirPath, files = []) {
    for (const entry of readdirSync(dirPath)) {
        const fullPath = join(dirPath, entry);
        if (statSync(fullPath).isDirectory()) getMarkdownFiles(fullPath, files);
        else if (entry.endsWith(".md")) files.push(fullPath);
    }

    return files.sort();
}

function readFile(filePath) {
    const text = readFileSync(filePath, "utf8");
    const bom = text.charCodeAt(0) === 0xFEFF;
    return { bom, content: bom ? text.slice(1) : text };
}

function slash(value) {
    return value.split(sep).join("/");
}
