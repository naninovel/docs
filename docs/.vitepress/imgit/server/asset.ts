/** Transformed asset type. */
export enum AssetType {
    /** Still image rendered with <code><picture></code> HTML tag; eg, png or jpg. */
    Image,
    /** Looped sequence of still images rendered with <code><picture></code> HTML tag; eg, gif. */
    Animation,
    /** Video rendered with <code><video></code> HTML tag; eg, mp4. */
    Video,
    /** YouTube video embedded within <code><iframe></code> HTML tag. */
    YouTube
}

/** Media info of the source asset content. */
export type MediaInfo = {
    /** Width of the source asset content, in pixels. */
    width: number;
    /** Height of the source asset content, in pixels. */
    height: number;
    /** Whether the source asset content has alpha channel (transparency). */
    alpha: boolean;
}

/** Asset syntax captured from transformed document. */
export type CapturedAsset = {
    /** Full text of the captured syntax. */
    syntax: string;
    /** First index of the captured syntax text inside transformed document content. */
    index: number;
    /** URL of the source asset resolved from captured syntax. */
    sourceUrl: string;
    /** Type of the asset resolved from captured syntax. */
    type: AssetType;
    /** Optional title of the asset resolved from captured syntax. */
    title?: string;
};

/** Asset with file content downloaded and available for probing. */
export type DownloadedAsset = CapturedAsset & {
    /** Full path to the source asset file on local file system or undefined when N/A. */
    sourcePath?: string;
};

/** Asset with identified content metadata. */
export type ProbedAsset = DownloadedAsset & {
    /** Media info of the source asset content. */
    sourceInfo?: MediaInfo;
};

/** Asset with encoded counterpart. */
export type EncodedAsset = ProbedAsset & {
    /** Full path to the encoded file on local file system or undefined when N/A or disabled. */
    encodedPath?: string;
    /** Full path to the poster file or undefined when N/A or disabled. */
    posterPath?: string;
};

/** Final product of asset transformation with associated HTML. */
export type BuiltAsset = EncodedAsset & {
    /** Transformed asset syntax in HTML form. */
    html: string;
};
