/** Asset types that can be transformed.
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

/** Original asset extracted from a transformed document.
 *  @typedef {Object} SourceAsset
 *  @property {number} start First index of the asset syntax in the transformed document.
 *  @property {number} end Last index of the asset syntax in the transformed document.
 *  @property {AssetType} type Type of the asset.
 *  @property {string} source Either absolute remote or relative URL of the asset content.
 *  @property {string?} filepath When local or downloaded remote asset, defines file path of the asset content.
 *  @property {string?} title Optional title of the asset. */

/** Product of asset transformation.
 *  @typedef {SourceAsset} HtmlAsset
 *  @property {string} html Transformed asset syntax in HTML form. */

/** @param {string} source
 *  @return {AssetType | undefined} */
export function resolveAssetType(source) {
    if (source.includes("youtube.com/watch?v="))
        return AssetType.YouTube;
    switch (getFileExtension(source)) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
        return AssetType.Image;
    case "mp4":
        return AssetType.Video;
    default:
        return undefined;
    }
}

/** @param {string} uri */
function getFileExtension(uri) {
    const start = uri.lastIndexOf(".") + 1;
    if (start >= uri.length) return "";
    return uri.substring(start);
}
