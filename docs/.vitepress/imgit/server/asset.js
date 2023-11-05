/** Supported asset types.
 *  @readonly
 *  @enum {string} */
export const AssetType = {
    Image: "Image",
    Video: "Video",
    YouTube: "YouTube"
};

/** @param {string} uri
 *  @return {AssetType | undefined} */
export function resolveAssetType(uri) {
    if (uri.includes("youtube.com/watch?v="))
        return AssetType.YouTube;
    switch (getFileExtension(uri)) {
    case "png":
    case "jpg":
    case "jpeg":
        return AssetType.Image;
    case "gif":
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
