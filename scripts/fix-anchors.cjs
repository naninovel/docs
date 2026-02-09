// Run `node fix-anchors.cjs` to scan all headers, map English anchors to their localized versions
// (handling NFD normalization and .html links), and update the files.

const fs = require("fs");
const path = require("path");

// Recursive function to get all files
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith(".md")) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

// Slugify function to match VuePress/VitePress
// Based on: https://github.com/vuejs/vitepress/blob/main/src/shared/slugify.ts
// But simplified for Node usage without importing large libs
function slugify(str) {
    // Remove formatting
    str = str.replace(/(\*\*|__)(.*?)\1/g, "$2").replace(/(\*|_)(.*?)\1/g, "$2").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/<[^>]+>/g, "");

    // Normalize to NFD to match user report that NFD anchors are required
    // This splits composed characters like 'ダ' into 'タ' + '゛'
    str = str.normalize("NFD");

    return str.toLowerCase().replace(/\s+/g, "-").replace(/-+/g, "-")
    // We must include \u3099 and \u309A (combining marks) explicitly if they fall outside ranges or just be safe
    // \u3000-\u303F : CJK Symbols and Punctuation
    // \u3040-\u309F : Hiragana (includes 3099, 309A)
    // \u30A0-\u30FF : Katakana
    // \u4E00-\u9FFF : CJK Unified Ideographs
    // Keeping previous ranges but ensuring coverage
    .replace(/[^\w\-\u4e00-\u9fa5\u3040-\u30ff\u3400-\u4dbf\uF900-\uFAFF\u3099\u309A]/g, "").replace(/^-+/, "").replace(/-+$/, "");
}

const docsRoot = "docs";
const enRoot = path.join(docsRoot, "en");
const jaRoot = path.join(docsRoot, "ja");
const zhRoot = path.join(docsRoot, "zh");

// Map: RelativePath -> { enSlug: localizedSlug }
const anchorMap = {
    ja: {},
    zh: {}
};

console.log("Building anchor maps...");

// 1. Build Maps
const enFiles = getAllFiles(enRoot);

enFiles.forEach(enFilePath => {
    const relativePath = path.relative(enRoot, enFilePath).replace(/\\/g, "/"); // Normalize to forward slashes

    // Read EN content
    let contentEn = fs.readFileSync(enFilePath, "utf8");
    // Strip BOM
    if (contentEn.charCodeAt(0) === 0xFEFF) {
        contentEn = contentEn.slice(1);
    }
    const headersEn = contentEn.match(/^#+ .*/gm) || [];

    // Process JA
    const jaFilePath = path.join(jaRoot, relativePath);
    if (fs.existsSync(jaFilePath)) {
        let contentJa = fs.readFileSync(jaFilePath, "utf8");
        // Strip BOM
        if (contentJa.charCodeAt(0) === 0xFEFF) {
            contentJa = contentJa.slice(1);
        }
        const headersJa = contentJa.match(/^#+ .*/gm) || [];

        if (headersEn.length === headersJa.length) {
            anchorMap.ja[relativePath] = {};
            headersEn.forEach((hEn, i) => {
                const titleEn = hEn.replace(/^#+ /, "").trim();
                const titleJa = headersJa[i].replace(/^#+ /, "").trim();
                const slugEn = slugify(titleEn);
                const slugJa = slugify(titleJa);
                anchorMap.ja[relativePath][slugEn] = slugJa;
            });
        } else {
            console.warn(`[JA] Header mismatch for ${relativePath}. EN: ${headersEn.length}, JA: ${headersJa.length}`);
        }
    }

    // Process ZH
    const zhFilePath = path.join(zhRoot, relativePath);
    if (fs.existsSync(zhFilePath)) {
        let contentZh = fs.readFileSync(zhFilePath, "utf8");
        // Strip BOM
        if (contentZh.charCodeAt(0) === 0xFEFF) {
            contentZh = contentZh.slice(1);
        }
        const headersZh = contentZh.match(/^#+ .*/gm) || [];

        if (headersEn.length === headersZh.length) {
            anchorMap.zh[relativePath] = {};
            headersEn.forEach((hEn, i) => {
                const titleEn = hEn.replace(/^#+ /, "").trim();
                const titleZh = headersZh[i].replace(/^#+ /, "").trim();
                const slugEn = slugify(titleEn);
                const slugZh = slugify(titleZh);
                anchorMap.zh[relativePath][slugEn] = slugZh;
            });
        } else {
            console.warn(`[ZH] Header mismatch for ${relativePath}. EN: ${headersEn.length}, ZH: ${headersZh.length}`);
        }
    }
});

// 2. Fix Anchors
console.log("Fixing anchors...");

[jaRoot, zhRoot].forEach(langRoot => {
    const lang = langRoot === jaRoot ? "ja" : "zh";
    const files = getAllFiles(langRoot);

    // Manual legacy anchor overrides (EN slug -> current EN slug equivalent or direct target)
    // This helps when the source link uses an old anchor that doesn't match current EN headers
    const manualOverrides = {
        "depth-of-field-bokeh": "bokeh",
        "digital-glitch": "glitch",
        "sun-shafts": "sun",
        "camera-effects": "custom-camera-effects",
        "transition-effects": "transition-effects",
        "blur": "blur",
        "rain": "rain",
        "shake": "shake",
        "snow": "snow"
    };

    files.forEach(filePath => {
        let content = fs.readFileSync(filePath, "utf8");
        let originalContent = content;
        const currentRelativePath = path.relative(langRoot, filePath).replace(/\\/g, "/");

        // Regex to find links: [text](url)
        // We capture:
        // 1. The part before the link parentheses: [text]
        // 2. The URL part inside parentheses: url
        content = content.replace(/(\[[^\]]+\])\(([^)]+)\)/g, (match, textPart, urlPart) => {
            if (!urlPart.includes("#")) return match; // No anchor, skip

            let [pathPart, anchorPart] = urlPart.split("#");

            // If anchor is empty, skip
            if (!anchorPart) return match;

            // Handle .html in path
            if (pathPart.endsWith(".html")) {
                pathPart = pathPart.replace(".html", "");
            }

            // Determine target file
            let targetRelativePath = "";

            if (pathPart === "" || pathPart === ".") {
                // Link to self
                targetRelativePath = currentRelativePath;
            } else if (pathPart.startsWith("/")) {
                // Absolute path (e.g. /guide/getting-started)
                // Remove /guide/ or /ja/guide/ prefix to match our relativePath map
                // Our map keys are like "guide/getting-started.md" or "api/index.md"

                // Remove language prefix if present (e.g. /ja/...)
                let cleanPath = pathPart;
                if (cleanPath.startsWith(`/${lang}/`)) {
                    cleanPath = cleanPath.substring(`/${lang}/`.length);
                } else if (cleanPath.startsWith("/")) {
                    cleanPath = cleanPath.substring(1);
                }

                // If path ends with / (directory), assume index.md
                if (cleanPath.endsWith("/")) {
                    cleanPath += "index.md";
                } else if (!cleanPath.endsWith(".md")) {
                    cleanPath += ".md";
                }

                targetRelativePath = cleanPath;
            } else {
                // Relative path (e.g. ../guide/foo)
                // Resolve relative to current file
                const currentDir = path.dirname(currentRelativePath);
                let resolved = path.join(currentDir, pathPart).replace(/\\/g, "/");

                if (resolved.endsWith("/")) resolved += "index.md";
                else if (!resolved.endsWith(".md")) resolved += ".md";

                targetRelativePath = resolved;
            }

            // Check if we have a mapping for this target file
            if (anchorMap[lang][targetRelativePath]) {
                const mapping = anchorMap[lang][targetRelativePath];

                let newAnchor = null;

                // Check manual overrides first
                if (manualOverrides[anchorPart]) {
                    const targetEnSlug = manualOverrides[anchorPart];
                    if (mapping[targetEnSlug]) {
                        newAnchor = mapping[targetEnSlug];
                    } else if (mapping[anchorPart]) {
                        // Fallback
                        newAnchor = mapping[anchorPart];
                    }
                }

                if (!newAnchor && mapping[anchorPart]) {
                    newAnchor = mapping[anchorPart];
                }

                if (!newAnchor) {
                    // Check values
                    const values = Object.values(mapping);
                    const normalizedAnchor = anchorPart.normalize("NFD");
                    const found = values.find(v => v === normalizedAnchor || v === anchorPart || v.normalize("NFC") === anchorPart.normalize("NFC"));
                    if (found) {
                        newAnchor = found;
                    }
                }

                // Try decoding if still not found
                if (!newAnchor) {
                    try {
                        const decodedAnchor = decodeURIComponent(anchorPart);

                        // Check manual overrides for decoded
                        if (manualOverrides[decodedAnchor] && mapping[manualOverrides[decodedAnchor]]) {
                            newAnchor = mapping[manualOverrides[decodedAnchor]];
                        }

                        if (!newAnchor) {
                            if (mapping[decodedAnchor]) {
                                newAnchor = mapping[decodedAnchor];
                            } else {
                                const values = Object.values(mapping);
                                const normalizedDecoded = decodedAnchor.normalize("NFD");
                                const found = values.find(v => v === normalizedDecoded || v === decodedAnchor || v.normalize("NFC") === normalizedDecoded.normalize("NFC"));
                                if (found) newAnchor = found;
                            }
                        }
                    }
                    catch (e) {}
                }

                if (newAnchor && newAnchor !== anchorPart) {
                    // Reconstruct URL with new anchor and cleaned path
                    // Note: If we cleaned .html from pathPart, we should output the cleaned path
                    return `${textPart}(${pathPart}#${newAnchor})`;
                }
            }

            return match;
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, "utf8");
            console.log(`Updated ${filePath}`);
        }
    });
});
