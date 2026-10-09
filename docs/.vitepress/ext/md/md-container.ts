import type { MarkdownEnv, MarkdownRenderer } from "vitepress";
import { containers } from "../l10n/locales";

// Localizes titles of the built-in custom containers (::: tip, ::: info NOTE, etc.).

const titleRegex = /(<p class="custom-block-title">)(.*?)(<\/p>)/;

export function ContainerPlugin(md: MarkdownRenderer) {
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
