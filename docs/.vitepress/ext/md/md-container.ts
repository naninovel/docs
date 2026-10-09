import container from "markdown-it-container";
import type { MarkdownEnv, MarkdownRenderer } from "vitepress";
import { containers } from "../l10n/locales";

// Registers :::: group / ::: item containers that render as tabbed content panels
// and localizes titles of the built-in ones (::: tip, ::: info NOTE, etc.).
// Group syntax:
//   :::: group
//   ::: item Title 1
//   Arbitrary Markdown content.
//   :::
//   ::: item Title 2
//   More content here.
//   :::
//   ::::

const titleRegex = /(<p class="custom-block-title">)(.*?)(<\/p>)/;

let nextId = 0;

export function ContainerPlugin(md: MarkdownRenderer) {
    registerGroups(md);
    localizeTitles(md);
}

function registerGroups(md: MarkdownRenderer) {
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

function localizeTitles(md: MarkdownRenderer) {
    for (const type of ["tip", "info", "warning", "danger"]) {
        const rule = `container_${type}_open`;
        const render = md.renderer.rules[rule];
        if (render == null) continue;
        md.renderer.rules[rule] = (tokens, idx, options, env: MarkdownEnv, self) => {
            const html = render(tokens, idx, options, env, self);
            const map = containers[env.relativePath?.split("/")[0] ?? ""];
            if (map == null) return html;
            return html.replace(titleRegex, (match, open, title, close) =>
                map[title] != null ? `${open}${map[title]}${close}` : match);
        };
    }
}

function uid() {
    return `g${nextId++}`;
}
