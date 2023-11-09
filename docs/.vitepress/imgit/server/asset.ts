import { options } from "./options";

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
    /** Full path to the source asset file on local file system. */
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
    /** Full path to the encoded asset content file on local file system. */
    encodedPath: string;
    /** Full path to the video poster file or undefined when N/A or disabled. */
    posterPath?: string;
};

/** Final product of asset transformation with associated HTML. */
export type BuiltAsset = EncodedAsset & {
    /** Transformed asset syntax in HTML form. */
    html: string;
};

export function resolveAssetType(uri: string): AssetType | undefined {
    const { image, animation, video, youtube } = options;
    if (uri.includes("youtube.com/watch?v="))
        return youtube ? AssetType.YouTube : undefined;
    const ext = getFileExtension(uri);
    if (image?.includes(ext)) return AssetType.Image;
    if (animation?.includes(ext)) return AssetType.Animation;
    if (video?.includes(ext)) return AssetType.Video;
    return undefined;
}

function getFileExtension(uri: string) {
    const start = uri.lastIndexOf(".") + 1;
    if (start >= uri.length) return "";
    return uri.substring(start);
}
