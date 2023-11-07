import type { MarkdownRenderer } from "vitepress";
import type { RenderRule } from "markdown-it/lib/renderer";

// const linkSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-10 -10 95 100' fill='currentColor' aria-hidden='true'><path d='M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z'></path><polygon points='45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9'></polygon></svg>";

export function AppendIconToExternalLinks(md: MarkdownRenderer) {
    const renderToken: RenderRule = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
    const defaultLinkOpenRenderer = md.renderer.rules.link_open || renderToken;
    const defaultLinkCloseRenderer = md.renderer.rules.link_close || renderToken;
    let externalLinkOpen = false;

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const href = token.attrGet("href");

        if (href) {
            token.attrJoin("class", "vp-link");
            if (/^((ht|f)tps?):\/\/?/.test(href))
                externalLinkOpen = true;
        }

        return defaultLinkOpenRenderer(tokens, idx, options, env, self);
    };

    md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
        if (externalLinkOpen) {
            externalLinkOpen = false;
            return `<span class="external-link-icon">&nbsp;🡕</span>${self.renderToken(tokens, idx, options)}`;
        }
        return defaultLinkCloseRenderer(tokens, idx, options, env, self);
    };
}
