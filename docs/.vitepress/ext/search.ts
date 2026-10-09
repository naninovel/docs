import { DefaultTheme } from "vitepress";
import { search as translations } from "./l10n/locales";

export const search: DefaultTheme.Config["search"] = {
    provider: "local",
    options: {
        detailedView: true,
        locales: translations,
        miniSearch: { options: { tokenize: tokenizeWords } }
    }
};

// Default tokenizer splits on spaces and punctuation only, so a Japanese or Chinese sentence
// becomes a single token and queries match only its beginning. This segments them into words instead.
function tokenizeWords(text: string): string[] {
    if (typeof Intl.Segmenter === "undefined") return text.split(/[\n\r\p{Z}\p{P}]+/u).filter(w => w.length > 0);
    const global = globalThis as { wordSegmenter?: Intl.Segmenter };
    global.wordSegmenter ??= new Intl.Segmenter(undefined, { granularity: "word" });
    const words: string[] = [];
    for (const segment of global.wordSegmenter.segment(text))
        if (segment.isWordLike) words.push(segment.segment);
    return words;
}
