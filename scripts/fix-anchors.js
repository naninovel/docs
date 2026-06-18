import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const docsRoot = join(root, "docs");
const sourceLang = "en";
const langs = ["en", "ja", "zh"];

const markdownLinkPattern = /(!?\[[^\]\n]+\])\(([^)\n]+)\)/g;
const controlCharacters = /[\u0000-\u001f]/g;
const combiningMarks = /[\u0300-\u036f]/g;
const specialCharacters = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'\u201c\u201d\u2018\u2019<>,.?/]+/g;

const langRoots = Object.fromEntries(langs.map(lang => [lang, join(docsRoot, lang)]));
const anchorIndexes = Object.fromEntries(langs.map(lang => [lang, buildAnchorIndex(lang)]));
const anchorMaps = Object.fromEntries(langs.map(lang => [lang, buildAnchorMap(lang)]));
const fixes = [];

for (const lang of langs) {
    for (const filePath of getMarkdownFiles(langRoots[lang])) {
        const relativePath = slash(relative(langRoots[lang], filePath));
        const original = readFile(filePath);
        const lineStarts = getLineStarts(original.content);
        const fileFixes = [];

        const fixed = original.content.replace(markdownLinkPattern, (match, textPart, rawDestination, offset) => {
            if (textPart.startsWith("!")) return match;

            const parsed = parseLinkDestination(rawDestination);
            if (!parsed) return match;

            const update = fixDestination(parsed.destination, lang, relativePath);
            if (!update) return match;

            fileFixes.push({
                line: getLineNumber(lineStarts, offset),
                before: parsed.destination,
                after: update.destination
            });

            return `${textPart}(${formatLinkDestination(parsed, update.destination)})`;
        });

        if (fixed !== original.content) {
            writeFileSync(filePath, `${original.bom ? "\uFEFF" : ""}${fixed}`, "utf8");
            fixes.push({ file: slash(relative(root, filePath)), fixes: fileFixes });
        }
    }
}

if (fixes.length === 0) {
    console.log("No anchor links needed fixing.");
}
else {
    const fixCount = fixes.reduce((count, file) => count + file.fixes.length, 0);
    console.log(`Fixed ${fixCount} anchor link${fixCount === 1 ? "" : "s"} in ${fixes.length} file${fixes.length === 1 ? "" : "s"}:`);

    for (const file of fixes) {
        console.log(file.file);
        for (const fix of file.fixes) {
            console.log(`  line ${fix.line}: ${fix.before} -> ${fix.after}`);
        }
    }
}

function buildAnchorIndex(lang) {
    const index = new Map();

    for (const filePath of getMarkdownFiles(langRoots[lang])) {
        const relativePath = slash(relative(langRoots[lang], filePath));
        const anchors = extractAnchors(readFile(filePath).content);
        const slugs = new Set(anchors.map(anchor => anchor.slug));
        index.set(relativePath, { anchors, slugs, slugLookup: buildSlugLookup(slugs) });
    }

    return index;
}

function buildAnchorMap(lang) {
    const map = new Map();
    const sourceIndex = anchorIndexes[sourceLang];
    const targetIndex = anchorIndexes[lang];

    for (const [relativePath, source] of sourceIndex) {
        const target = targetIndex.get(relativePath);
        if (!target) continue;

        if (lang !== sourceLang && source.anchors.length !== target.anchors.length) {
            console.warn(`[skip] ${lang}/${relativePath}: heading count differs from ${sourceLang}/${relativePath}`);
            continue;
        }

        const anchors = new Map();
        for (let i = 0; i < source.anchors.length; i++) {
            anchors.set(source.anchors[i].slug, target.anchors[i].slug);
        }
        map.set(relativePath, anchors);
    }

    return map;
}

function fixDestination(destination, lang, currentRelativePath) {
    const hashIndex = destination.indexOf("#");
    if (hashIndex < 0) return null;

    const pathPart = destination.slice(0, hashIndex);
    const anchorPart = destination.slice(hashIndex + 1);
    if (!anchorPart || isExternal(pathPart)) return null;

    const resolved = resolveTarget(pathPart, currentRelativePath, lang);
    if (!resolved) return null;

    const targetMap = anchorMaps[lang].get(resolved.relativePath);
    const targetIndex = anchorIndexes[lang].get(resolved.relativePath);
    if (!targetMap || !targetIndex) return null;

    const fixedAnchor = findAnchor(anchorPart, targetMap, targetIndex);
    if (!fixedAnchor || fixedAnchor === anchorPart) return null;

    return { destination: `${resolved.outputPath}#${fixedAnchor}` };
}

function findAnchor(anchor, targetMap, targetIndex) {
    const candidates = getAnchorCandidates(anchor);

    for (const candidate of candidates) {
        if (targetMap.has(candidate)) return targetMap.get(candidate);
    }

    for (const candidate of candidates) {
        const existing = targetIndex.slugLookup.get(candidate);
        if (existing) return existing;
    }

    return null;
}

function getAnchorCandidates(anchor) {
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

    return [...candidates];
}

function buildSlugLookup(slugs) {
    const lookup = new Map();

    for (const slug of slugs) {
        for (const candidate of getAnchorCandidates(slug)) {
            if (!lookup.has(candidate)) lookup.set(candidate, slug);
        }
    }

    return lookup;
}

function resolveTarget(pathPart, currentRelativePath, lang) {
    if (pathPart === "" || pathPart === ".") {
        return { relativePath: currentRelativePath, outputPath: pathPart };
    }

    let outputPath = pathPart;
    if (outputPath.endsWith(".html")) outputPath = outputPath.slice(0, -".html".length);

    if (pathPart.startsWith("/")) {
        let cleanPath = outputPath;
        if (cleanPath.startsWith(`/${lang}/`)) cleanPath = cleanPath.slice(lang.length + 2);
        else cleanPath = cleanPath.slice(1);

        return { relativePath: toMarkdownPath(cleanPath), outputPath };
    }

    const currentDir = posix.dirname(currentRelativePath);
    const cleanPath = posix.normalize(posix.join(currentDir, outputPath));
    return { relativePath: toMarkdownPath(cleanPath), outputPath };
}

function toMarkdownPath(targetPath) {
    if (targetPath.endsWith("/")) return `${targetPath}index.md`;
    if (targetPath.endsWith(".md")) return targetPath;
    return `${targetPath}.md`;
}

function extractAnchors(content) {
    const anchors = [];
    const used = new Set();
    let fence = null;

    for (const line of content.split(/\r?\n/)) {
        const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})/);
        if (fenceMatch) {
            const marker = fenceMatch[1];
            if (!fence) fence = { char: marker[0], length: marker.length };
            else if (marker[0] === fence.char && marker.length >= fence.length) fence = null;
            continue;
        }

        if (fence) continue;

        const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);
        if (!headingMatch) continue;

        const title = stripHeadingMarkup(headingMatch[2]);
        const slug = uniqueSlug(slugify(title), used);
        anchors.push({ title, slug });
    }

    return anchors;
}

function stripHeadingMarkup(heading) {
    return heading
        .replace(/\s+#+\s*$/, "")
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/(\*\*|__)(.*?)\1/g, "$2")
        .replace(/(\*|_)(.*?)\1/g, "$2")
        .replace(/<[^>]+>/g, "")
        .trim();
}

function slugify(value) {
    return value
        .normalize("NFKD")
        .replace(combiningMarks, "")
        .replace(controlCharacters, "")
        .replace(specialCharacters, "-")
        .replace(/-{2,}/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/^(\d)/, "_$1")
        .toLowerCase();
}

function uniqueSlug(slug, used) {
    let candidate = slug;
    let index = 1;

    while (used.has(candidate)) {
        candidate = `${slug}-${index++}`;
    }

    used.add(candidate);
    return candidate;
}

function parseLinkDestination(rawDestination) {
    const match = rawDestination.match(/^(\s*)(<[^>]*>|[^\s]+)([\s\S]*)$/);
    if (!match) return null;

    const [, prefix, raw, suffix] = match;
    const angled = raw.startsWith("<") && raw.endsWith(">");
    const destination = angled ? raw.slice(1, -1) : raw;

    return { prefix, destination, suffix, angled };
}

function formatLinkDestination(parsed, destination) {
    const rawDestination = parsed.angled ? `<${destination}>` : destination;
    return `${parsed.prefix}${rawDestination}${parsed.suffix}`;
}

function isExternal(pathPart) {
    return /^[a-z][a-z0-9+.-]*:/i.test(pathPart) || pathPart.startsWith("//");
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

function getLineStarts(content) {
    const starts = [0];
    for (let i = 0; i < content.length; i++) {
        if (content[i] === "\n") starts.push(i + 1);
    }
    return starts;
}

function getLineNumber(lineStarts, offset) {
    let low = 0;
    let high = lineStarts.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (lineStarts[mid] <= offset) low = mid + 1;
        else high = mid - 1;
    }

    return high + 1;
}

function slash(value) {
    return value.split(sep).join("/");
}
