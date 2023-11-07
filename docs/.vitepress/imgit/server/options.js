/** @typedef {import("./asset").SourceAsset} SourceAsset
 *  @typedef {import("./asset").FetchedAsset} FetchedAsset
 *  @typedef {import("./asset").ProbedAsset} ProbedAsset
 *  @typedef {import("./asset").EncodedAsset} EncodedAsset
 *  @typedef {import("./asset").BuiltAsset} BuiltAsset */

/** Configures plugin behaviour.
 *  @typedef {Object} Options
 *  @property {string} root
 *  Directory where the asset files are stored locally in development environment.
 *  @property {string} serve
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
 *  @property {FetchOptions?} fetch
 *  Configure remote assets fetching.
 *  @property {EncodeOptions?} encode
 *  Configure assets encoding.
 *  @property {BuildOptions?} build
 *  Configure HTML building for source assets of specific types.
 *  @property {TransformOptions?} transform
 *  Configure document transformation process.*/

/** Configures remote assets fetching behaviour.
 * @typedef {Object} FetchOptions
 * @property {number?} timeout
 * How long to wait when downloading remote asset, in seconds.
 * @property {number?} retries
 * How many times to restart the download when request fails.
 * @property {number?} delay
 * How long to wait before restarting a failed download, in seconds. */

/** Configures asset encoding and optimization.
 * @typedef {Object} EncodeOptions
 * @property {(string | boolean)?} image
 * ffmpeg arguments specified when encoding still image assets (png, jpg);
 * assign <code>false</code> to disable images encoding.
 * @property {(string | boolean)?} animation
 * ffmpeg arguments specified when encoding animated image assets (gif);
 * assign <code>false</code> to disable animated images encoding.
 * @property {(string | boolean)?} video
 * ffmpeg arguments specified when encoding video assets (mp4);
 * assign <code>false</code> to disable video encoding.*/

/** Configures HTML building for source assets of specific types.
 *  @typedef {Object} BuildOptions
 *  @property {((asset: EncodedAsset) => Promise<string>)?} image
 *  Returns HTML string for specified source image asset.
 *  @property {((asset: EncodedAsset) => Promise<string>)?} video
 *  Returns HTML string for specified source video asset.
 *  @property {((asset: EncodedAsset) => Promise<string>)?} youtube
 *  Returns HTML string for specified source YouTube asset. */

/** Configures document transformation process.
 *  @typedef {Object} TransformOptions
 *  @property {((docpath: string, content: string) => Promise<SourceAsset[]>)?} capture
 *  1st phase: finds assets to transform in the document with specified file path and content.
 *  @property {((docpath: string, assets: SourceAsset[]) => Promise<FetchedAsset[]>)?} fetch
 *  2nd phase: fetches file content for the captured source assets from the specified document file path.
 *  @property {((docpath: string, assets: FetchedAsset[]) => Promise<ProbedAsset[]>)?} probe
 *  3rd phase: probes fetched files content to evaluate their width and height.
 *  @property {((docpath: string, assets: ProbedAsset[]) => Promise<EncodedAsset[]>)?} encode
 *  4th phase: creates optimized versions of the source asset files.
 *  @property {((docpath: string, assets: EncodedAsset[]) => Promise<BuiltAsset[]>)?} build
 *  5th phase: builds HTML for the optimized assets to overwrite source syntax.
 *  @property {((docpath: string, content: string, assets: BuiltAsset[]) => Promise<string>)?} rewrite
 *  6th phase: rewrites content of the document with specified assets; returns modified document content. */

/** @type {Options} */
export const defaults = Object.freeze({
    root: undefined,
    serve: undefined,
    regex: /!\[(?<title>.*?)]\((?<uri>.+?)\)/g,
    suffix: "-imgit",
    width: undefined,
    image: ["png", "jpg", "jpeg", "gif"],
    video: ["mp4"],
    youtube: true,
    poster: undefined,
    fetch: {
        timeout: 30,
        retries: 3,
        delay: 6
    },
    encode: {
        image: "-loglevel warning -stats -c:v librav1e -rav1e-params speed=4:quantizer=100:still_picture=true",
        animation: "-loglevel warning -stats -c:v librav1e -rav1e-params speed=6:quantizer=150",
        video: "-loglevel warning -stats -c:v libsvtav1 -preset 4"
    },
    build: {
        image: undefined,
        video: undefined,
        youtube: undefined
    },
    transform: {
        capture: undefined,
        fetch: undefined,
        probe: undefined,
        encode: undefined,
        build: undefined,
        rewrite: undefined
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
