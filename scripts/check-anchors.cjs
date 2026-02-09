// Run `node check-anchors.cjs` to confirm all the localized (ja and cz) link anchors are valid.

const fs = require("fs");
const path = require("path");

const docsRoot = "docs";
const allFiles = getAllFiles(docsRoot);

// Build map of File -> Set of Anchors (slugs)
const fileAnchors = {};

console.log("Building anchor index...");
allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, "utf8");
    // Strip BOM
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

    const relativePath = path.relative(docsRoot, filePath).replace(/\\/g, "/");
    const headers = content.match(/^#+ .*/gm) || [];

    fileAnchors[relativePath] = new Set();

    headers.forEach(h => {
        const title = h.replace(/^#+ /, "").trim();
        const slug = slugify(title);
        fileAnchors[relativePath].add(slug);
    });
});

console.log("Checking links...");
let brokenLinks = 0;

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, "utf8");
    const currentRelativePath = path.relative(docsRoot, filePath).replace(/\\/g, "/");
    const currentDir = path.dirname(currentRelativePath);

    // Matches [text](url)
    const regex = /(\[[^\]]+\])\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const url = match[2];

        // Ignore external links
        if (url.startsWith("http")) continue;

        // Ignore mailto
        if (url.startsWith("mailto:")) continue;

        const [pathPart, anchorPart] = url.split("#");

        // Determine target file
        let targetFile = "";

        if (!pathPart) {
            // Internal link to same file
            targetFile = currentRelativePath;
        } else if (pathPart.startsWith("/")) {
            // Absolute path from docs root (e.g. /guide/foo)
            // VitePress treats / as docs root
            let cleanPath = pathPart.substring(1);
            if (cleanPath.endsWith("/")) cleanPath += "index.md";
            else if (!cleanPath.endsWith(".md")) cleanPath += ".md";
            targetFile = cleanPath;
        } else {
            // Relative path
            let resolved = path.join(currentDir, pathPart).replace(/\\/g, "/");
            if (resolved.endsWith("/")) resolved += "index.md";
            else if (!resolved.endsWith(".md")) resolved += ".md";
            targetFile = resolved;
        }

        // Verify file existence
        if (!fileAnchors[targetFile]) {
            // Maybe it's a directory without index.md? or just bad link
            // Try removing .md and see if it's a dir? VitePress handles this but for our check:
            // The map keys contain .md extension.

            // Special case: /api/ -> api/index.md
            // already handled above

            console.log(`[Broken File] ${currentRelativePath}: Link to '${url}' (Target: ${targetFile} not found)`);
            brokenLinks++;
            continue;
        }

        // Verify anchor existence
        if (anchorPart) {
            const anchors = fileAnchors[targetFile];
            // Normalize anchorPart (it might be encoded or not)
            let decodedAnchor;
            try {
                decodedAnchor = decodeURIComponent(anchorPart);
            }
            catch (e) {
                decodedAnchor = anchorPart;
            }

            // VitePress slugs are lowercased and NFD
            const normalizedAnchor = decodeURIComponent(anchorPart).normalize("NFD").toLowerCase(); // simple approx
            // We use the slugify function to match exact logic

            // Note: The anchor in the link is ALREADY a slug.
            // But we need to check if it matches any slug in the target file.

            // Check if exact match
            if (!anchors.has(decodedAnchor) && !anchors.has(anchorPart)) {
                // Try to see if it matches after normalization (sometimes casing differs?)
                // VitePress slugs are usually predictable.

                // Let's try to verify if it's a casing issue
                // But generally, if it's not in the set, it's broken.

                // One false positive source: The anchor part in link might NOT be NFD in the file text,
                // but we generated NFD slugs in fileAnchors.
                // So ensure decodedAnchor is NFD.
                const nfdAnchor = decodedAnchor.normalize("NFD");

                if (!anchors.has(nfdAnchor)) {
                    console.log(`[Broken Anchor] ${currentRelativePath}: Link to '${url}' (Anchor '#${anchorPart}' not found in ${targetFile})`);
                    // console.log(`Available anchors:`, Array.from(anchors).join(', '));
                    brokenLinks++;
                }
            }
        }
    }
});

console.log(`Done. Found ${brokenLinks} potentially broken links.`);
