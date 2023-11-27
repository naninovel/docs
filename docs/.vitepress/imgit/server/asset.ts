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
    /** URL from captured syntax; may be direct location of the asset's content (eg, image link)
     *  or endpoint for resolving the content, such as REST API or YouTube link. */
    url: string;
    /** Optional title of the asset from captured syntax. */
    title?: string;
    /** Optional user-defined asset metadata from captured syntax. */
    meta?: AssetMeta;
}

/** User-defined optional asset metadata from captured syntax. */
export type AssetMeta = {
    /** Width threshold of the source asset content, in pixels.
     *  Overrides global <code>width</code> parameter. */
    width?: number;
    /** When set to <code>true</code> the asset will be loaded eagerly (instead of default lazy).
     *  Use for above the fold content, ie initially visible w/o scrolling, such as hero image. */
    eager?: boolean;
}

/** Asset with resolved remote content locations and type. */
export type ResolvedAsset = CapturedAsset & {
    /** Asset's content locations (URL) resolved from captured syntax. */
    remote: {
        /** Location (URL) of the asset's main content file, when applicable. */
        main?: string;
        /** Location (URL) of the asset's poster file, when applicable. */
        poster?: string;
    };
    /** Resolved type of the asset. Could be either a MIME type (eg, "image/png") or a custom
     *  embedded type when the asset doesn't have an associated main content file (eg, "embed/youtube"). */
    type: string;
}

/** Asset with content files downloaded to local file system. */
export type DownloadedAsset = ResolvedAsset & {
    /** Full paths to the asset's content files on local file system. */
    local: {
        /** Full path to the asset's main content file, when applicable. */
        main?: string;
        /** Full path to the asset's poster file, when applicable. */
        poster?: string;
    }
};

/** Asset with identified (probed) content. */
export type ProbedAsset = DownloadedAsset & {
    /** Info about the probed asset content. */
    content: {
        main?: AssetContent;
        poster?: AssetContent
    };
    /** Whether any of the asset content files were modified since last build. */
    dirty?: boolean;
};

/** Identified (probed) content of an asset. */
export type AssetContent = {
    /** Width of the content, in pixels. */
    width: number;
    /** Height of the content, in pixels. */
    height: number;
    /** Whether the content has alpha channel (transparency). */
    alpha: boolean;
    /** When the content file was last modified, in full seconds since epoch. */
    modified: number;
}

/** Asset with encoded content. */
export type EncodedAsset = ProbedAsset & {
    /** Full paths to the asset's encoded content files on local file system. */
    encoded: {
        /** Full path to the asset's main encoded content file, when applicable. */
        main?: string;
        /** Full path to the asset's encoded content file with double resolution, when applicable. */
        x2?: string;
        /** Full path to the asset's encoded poster file, when applicable. */
        poster?: string;
    }
};

/** Final product of asset transformation with associated HTML. */
export type BuiltAsset = EncodedAsset & {
    /** Transformed asset syntax in HTML form. */
    html: string;
};
