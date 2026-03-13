import container from "markdown-it-container";
import type { MarkdownRenderer } from "vitepress";

// Registers :::: group / ::: item containers that render as tabbed content panels.
// Syntax:
//   :::: group
//   ::: item Title 1
//   Arbitrary Markdown content.
//   :::
//   ::: item Title 2
//   More content here.
//   :::
//   ::::

let nextId = 0;

export function GroupContainerPlugin(md: MarkdownRenderer) {
    md.use(container, "group", {
        render(tokens: any[], idx: number) {
            if (tokens[idx].nesting === 1) {
                const groupId = uid();
                let tabs = "";
                let first = true;
                for (let i = idx + 1; i < tokens.length; i++) {
                    if (tokens[i].nesting === -1 && tokens[i].type === "container_group_close") break;
                    if (tokens[i].type === "container_item_open") {
                        const tabId = uid();
                        const title = tokens[i].info.trim().replace(/^item\s*/, "").trim() || "Tab";
                        const checked = first ? " checked" : "";
                        tabs +=
                            `<input type="radio" name="group-${groupId}" id="tab-${tabId}"${checked}>` +
                            `<label data-title="${title}" for="tab-${tabId}">${title}</label>`;
                        if (first) tokens[i].meta = { ...tokens[i].meta, active: true };
                        first = false;
                    }
                }
                return `<div class="content-group"><div class="tabs">${tabs}</div><div class="blocks">\n`;
            }
            return `</div></div>\n`;
        }
    });
    md.use(container, "item", {
        render(tokens: any[], idx: number) {
            if (tokens[idx].nesting !== 1) return `</div>\n`;
            return `<div class="block${tokens[idx].meta?.active ? " active" : ""}">\n`;
        }
    });
}

function uid() {
    return `g${nextId++}`;
}
