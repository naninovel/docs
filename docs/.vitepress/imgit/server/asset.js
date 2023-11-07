import { options } from "./options.js";

/** Transformed asset types.
 *  @readonly
 *  @enum {string} */
export const AssetType = {
    /** Still or animated picture rendered with img HTML tag. */
    Image: "Image",
    /** Video rendered with video HTML tag. */
    Video: "Video",
    /** YouTube video embedded with iframe HTML tag. */
    YouTube: "YouTube"
};

/** Asset syntax captured from a transformed document.
 *  @typedef {Object} SourceAsset
 *  @property {number} start First index of the captured asset syntax in the transformed document.
 *  @property {number} end Last index of the captured asset syntax in the transformed document.
 *  @property {string} source URL of the source asset content resolved from captured syntax.
 *  @property {AssetType} type Type of the asset resolved from captured syntax.
 *  @property {string?} title Optional title of the asset resolved from captured syntax. */

/** Asset with file content fetched and available for probing.
 *  @typedef {SourceAsset} FetchedAsset
 *  @property {string} sourcefile Path to the source asset content file on local file system. */

/** Asset with identified dimensions.
 *  @typedef {FetchedAsset} ProbedAsset
 *  @property {number} width Width of the source asset content, in pixels.
 *  @property {number} height Height of the source asset content, in pixels. */

/** Asset with encoded counterpart.
 *  @typedef {ProbedAsset} EncodedAsset
 *  @property {string} encodedfile Path to the encoded asset content file on local file system. */

/** Final product of asset transformation with associated HTML.
 *  @typedef {ProbedAsset} BuiltAsset
 *  @property {string} html Transformed asset syntax in HTML form. */

/** @param {string} source
 *  @return {AssetType | undefined} */
export function resolveAssetType(source) {
    const { image, video, youtube } = options;
    if (source.includes("youtube.com/watch?v="))
        return youtube ? AssetType.YouTube : undefined;
    const ext = getFileExtension(source);
    if (image.includes(ext)) return AssetType.Image;
    if (video.includes(ext)) return AssetType.Video;
    return undefined;
}

/** @param {string} uri */
function getFileExtension(uri) {
    const start = uri.lastIndexOf(".") + 1;
    if (start >= uri.length) return "";
    return uri.substring(start);
}
