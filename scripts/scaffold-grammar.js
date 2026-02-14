import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const testPath = resolve(__dirname, "../test/grammar.test.ts");
const docsPath = resolve(__dirname, "../docs/en/grammar.md");

const testContent = readFileSync(testPath, "utf8");
const lines = testContent.split("\n");

const groups = [];
let currentGroup = [];

for (const line of lines) {
    const commentMatch = line.match(/^\/\/ (.+)$/);
    if (commentMatch) {
        if (currentGroup.length > 0) groups.push(currentGroup);
        currentGroup = [];
        continue;
    }
    const snapMatch = line.match(/snap\(`([^`]*)`\)/);
    if (snapMatch) currentGroup.push(snapMatch[1].replace(/\\\\/g, "\\"));
}
if (currentGroup.length > 0) groups.push(currentGroup);

const content = `# Grammar Test

\`\`\`nani
${groups.map(g => g.join("\n")).join("\n\n")}
\`\`\`
`;

writeFileSync(docsPath, content);