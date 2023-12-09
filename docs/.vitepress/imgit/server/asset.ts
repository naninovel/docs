import { MediaInfo } from "./encoder";

/** Asset captured from transformed document. */
export type CapturedAsset = {
    /** Syntax of the captured asset. */
    syntax: AssetSyntax;
};

/** Asset syntax captured from transformed document. */
export type AssetSyntax = {
    /** Full text of the captured syntax. */
    text: string;
    /** First index of the captured syntax text inside transformed document content. */
    index: number;
    /** URL from captured syntax; may be direct location of the asset's source content (eg, image link)
     *  or endpoint for resolving the content, such as REST API or YouTube link. */
    url: string;
    /** Optional alternate text from captured syntax. */
    alt?: string;
    /** Optional raw (un-parsed) user-defined asset specifications from captured syntax. */
    spec?: string;
}

/** Asset with resolved source content locations and specs. */
export type ResolvedAsset = CapturedAsset & {
    /** Source content of the asset, when applicable. */
    content?: ResolvedContent;
    /** Optional user-defined asset specifications resolved (parsed) from captured syntax. */
    spec?: AssetSpec;
}

/** Source content of an asset resolved from captured syntax. */
export type ResolvedContent = {
    /** Location (absolute or relative URL) of the source content file. */
    src: string;
}

/** Per-asset specifications assigned by the user. */
export type AssetSpec = {
    /** Width threshold for the asset content, in pixels.
     *  Overrides global <code>width</code> parameter. */
    width?: number;
    /** When set to <code>true</code> the asset will be loaded eagerly (instead of default lazy).
     *  Use for above the fold content, ie initially visible w/o scrolling, such as hero image. */
    eager?: boolean;
    /** When set to <code>true</code> syntax will be merged with the previous one in the document.
     *  Can be used to specify multiple sources with different specs for a single asset. */
    merge?: boolean;
    /** Media attribute to specify for applicable source tag. Can be used with the "merge" spec
     *  for art direction. Example below will show "wide.png" when window width is 800px or more
     *  and switch to "narrow.png" when the window width is equal to or below 799px.
     *  @example
     *  ![?media=(min-width:800px)](/wide.png)
     *  ![?media=(max-width:799px)&merge](/narrow.png) */
    media?: string;
    /** When specified, adds specified class attribute to generated HTML container. */
    class?: string;
}

/** Asset with all the applicable source content files available on the local file system. */
export type FetchedAsset = ResolvedAsset & {
    /** Source content of the asset, when applicable. */
    content?: FetchedContent;
    /** Whether any of the source content files were modified since last build. */
    dirty?: boolean;
};

/** Fetched source content of an asset. */
export type FetchedContent = ResolvedContent & {
    /** Full path to the asset's source content file on local file system. */
    local: string;
}

/** Asset with identified source content. */
export type ProbedAsset = FetchedAsset & {
    /** Source content of the asset, when applicable. */
    content?: ProbedContent;
};

/** Identified source content of an asset. */
export type ProbedContent = FetchedContent & {
    /** Media info about the probed source content. */
    info: MediaInfo;
}

/** Asset with all the applicable encoded/generated content available on local file system. */
export type EncodedAsset = ProbedAsset & {
    /** Source content of the asset, when applicable. */
    content?: EncodedContent;
};

/** Optimized source of an asset with optional generated content. */
export type EncodedContent = ProbedContent & {
    /** Full path to the asset's encoded/optimized content file on local file system. */
    encoded: string;
    /** Generated variant of the source content for compatibility/fallback, when applicable. */
    safe?: string;
    /** Generated variant of the source content for high-dpi displays, when applicable. */
    dense?: string;
    /** Generated variant of the source content to cover loading process, when applicable. */
    cover?: string;
}

/** Final product of asset transformation with associated HTML. */
export type BuiltAsset = EncodedAsset & {
    /** Transformed asset syntax in HTML form. */
    html: string;
};
