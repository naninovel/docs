import { options } from "./options";

/** Transformed asset type. */
export enum AssetType {
    /** Still or animated image rendered with <code><picture></code> HTML tag. */
    Image,
    /** Video rendered with <code><video></code> HTML tag. */
    Video,
    /** YouTube video embedded within <code><iframe></code> HTML tag. */
    YouTube
}

/** Asset syntax captured from transformed document. */
export type CapturedAsset = {
    /** Full text of the captured syntax. */
    syntax: string;
    /** First index of the captured syntax text. */
    startIndex: number;
    /** Last index of the captured syntax text. */
    endIndex: number;
    /** URL of the source asset resolved from captured syntax. */
    sourceUrl: string;
    /** Type of the asset resolved from captured syntax. */
    type: AssetType;
    /** Optional title of the asset resolved from captured syntax. */
    title?: string;
};

/** Asset with file content fetched and available for probing. */
export type FetchedAsset = CapturedAsset & {
    /** Path to the source asset content file on local file system. */
    sourcePath: string;
};

/** Asset with identified content metadata. */
export type ProbedAsset = FetchedAsset & {
    /** Width of the source asset content, in pixels. */
    width: number;
    /** Height of the source asset content, in pixels. */
    height: number;
};

/** Asset with encoded counterpart. */
export type EncodedAsset = ProbedAsset & {
    /** Path to the encoded asset content file on local file system. */
    encodedPath: string;
    /** Path to the video poster file or undefined when N/A or disabled. */
    posterPath?: string;
};

/** Final product of asset transformation with associated HTML. */
export type BuiltAsset = EncodedAsset & {
    /** Transformed asset syntax in HTML form. */
    html: string;
};

export function resolveAssetType(sourceUrl: string): AssetType | undefined {
    const { image, video, youtube } = options;
    if (sourceUrl.includes("youtube.com/watch?v="))
        return youtube ? AssetType.YouTube : undefined;
    const ext = getFileExtension(sourceUrl);
    if (image?.includes(ext)) return AssetType.Image;
    if (video?.includes(ext)) return AssetType.Video;
    return undefined;
}

function getFileExtension(uri: string) {
    const start = uri.lastIndexOf(".") + 1;
    if (start >= uri.length) return "";
    return uri.substring(start);
}
