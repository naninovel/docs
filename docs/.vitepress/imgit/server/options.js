/** @typedef {import("./asset").SourceAsset} SourceAsset
 *  @typedef {import("./asset").FetchedAsset} FetchedAsset
 *  @typedef {import("./asset").ProbedAsset} ProbedAsset
 *  @typedef {import("./asset").EncodedAsset} EncodedAsset
 *  @typedef {import("./asset").BuiltAsset} BuiltAsset */

/** Configures plugin behaviour.
 *  @typedef {Object} Options
 *  @property {string} localDir
 *  Directory where the asset files are stored locally in development environment.
 *  @property {string} serveDir
 *  Directory from which the assets are served in production environment.
 *  @property {RegExp?} regex
 *  Regular expression to use for capturing transformed assets syntax.
 *  Expects <code>title</code> and <code>uri</code> capture groups.
 *  By default, captures Markdown image syntax: <code>/!\[(?<title>.*?)]\((?<uri>.+?)\)/g</code>.
 *  @property {string?} suffix
 *  Text to append to the name of encoded asset files; <code>-imgit</code> by default.
 *  @property {number?} width
 *  Width limit for the transformed assets, in pixels. When source asset is larger,
 *  will resize the content (given encoding is not disabled). No limit by default.
 *  @property {string[]?} image
 *  File extensions (w/o dot) to encode into av1 still frame under avif container
 *  and transform into HTML picture (with fallback to source); default: png, jpg, jpeg and gif.
 *  @property {string[]?} video
 *  File extensions (w/o dot) to encode into av1 video under mp4 container
 *  and transform into HTML video (with fallback to source); default: mp4.
 *  @property {boolean?} youtube
 *  Whether to transform YouTube links as videos; enabled by default.
 *  @property {(string | boolean)?} poster
 *  Source of an image to use for all video posters. When undefined automatically generates
 *  unique image for each video; assign <code>false</code> to disable posters completely.
 *  @property {TransformOptions?} transform
 *  Configure document and asset transformation process.
 *  @property {BuildOptions?} build
 *  Configure process of building HTML syntax for transformed assets.
 *  @property {(FetchOptions | boolean)?} fetch
 *  Configure remote assets fetching; assign <code>false</code> to disable fetching.
 *  @property {(EncodeOptions | boolean)?} encode
 *  Configure assets encoding; assign <code>false</code> to disable encoding. */

/** Configures document transformation behaviour.
 *  @typedef {Object} TransformOptions
 *  @property {((filepath: string, content: string) => Promise<SourceAsset[]>)?} extract
 *  Finds assets to transform in the document with specified file path and content.
 *  @property {((filepath: string, source: SourceAsset) => Promise<HtmlAsset[]>)?} build
 *  Produces HTML to rewrite source asset syntax in the transformed document with specified file path.
 *  @property {((filepath: string, content: string, assets: HtmlAsset[]) => Promise<string>)?} rewrite
 *  Rewrites content of the document with specified assets; returns modified document content. */

/** Configures HTML building for transformed assets of specific types.
 *  @typedef {Object} BuildOptions
 *  @property {((source: SourceAsset) => Promise<string>)?} image
 *  Returns HTML string for specified source image asset.
 *  @property {((source: SourceAsset) => Promise<string>)?} video
 *  Returns HTML string for specified source video asset.
 *  @property {((source: SourceAsset) => Promise<string>)?} youtube
 *  Returns HTML string for specified source YouTube asset. */

/** Configures remote assets fetching behaviour.
 * @typedef {Object} FetchOptions
 * @property {number?} timeout
 * How long to wait when downloading remote asset, in seconds.
 * @property {number?} retries
 * How many times to restart the download when request fails.
 * @property {number?} delay
 * How long to wait before restarting a failed download, in seconds.
 * @property {((url: string, filepath: string) => Promise<void>)?} download
 * Fetches asset content from specified URL and writes it to specified file path. */

/** Configures asset encoding behaviour.
 * @typedef {Object} EncodeOptions
 * @property {string?} image
 * ffmpeg arguments specified when encoding still image assets (png, jpg).
 * @property {string?} animation
 * ffmpeg arguments specified when encoding animated image assets (gif).
 * @property {string?} video
 * ffmpeg arguments specified when encoding video assets (mp4).
 * @property {((asset: SourceAsset, filepath: string) => Promise<void>)?} encode
 * Encodes specified asset and writes encoded content to specified file path. */

/** @type {Options} */
export const defaults = Object.freeze({
    localDir: undefined,
    serveDir: undefined,
    regex: /!\[(?<title>.*?)]\((?<uri>.+?)\)/g,
    suffix: "-imgit",
    width: undefined,
    image: ["png", "jpg", "jpeg", "gif"],
    video: ["mp4"],
    youtube: true,
    poster: undefined,
    transform: {
        extract: undefined,
        build: undefined,
        rewrite: undefined
    },
    build: {
        image: undefined,
        video: undefined,
        youtube: undefined
    },
    fetch: {
        timeout: 30,
        retries: 3,
        delay: 6,
        download: undefined
    },
    encode: {
        image: "-loglevel warning -stats -c:v librav1e -rav1e-params speed=4:quantizer=100:still_picture=true",
        animation: "-loglevel warning -stats -c:v librav1e -rav1e-params speed=6:quantizer=150",
        video: "-loglevel warning -stats -c:v libsvtav1 -preset 4",
        encode: undefined
    }
});

/** @type {Options} */
export const options = { ...defaults };

/** @param {Options} settings */
export function configure(settings) {
    for (const prop in settings)
        if (options.hasOwnProperty(prop))
            options[prop] = settings[prop];
}
