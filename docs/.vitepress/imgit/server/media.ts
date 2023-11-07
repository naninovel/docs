import ffprobe from "ffprobe";
import probes from "ffprobe-static";

/** @typedef MediaStream
 *  @property {number} index
 *  @property {number} width
 *  @property {number} height */

/** @typedef MediaInfo
 *  @property {MediaStream[]} streams */

/** @type {Map<string, Promise<MediaInfo>>} */
const resolves = new Map;

/** @param {string} filePath
 *  @return {Promise<MediaInfo>} */
export async function resolveMediaInfo(filePath) {
    if (resolves.has(filePath)) return resolves.get(filePath);
    resolves.set(filePath, ffprobe(filePath, { path: probes.path }));
    return resolves.get(filePath);
}
