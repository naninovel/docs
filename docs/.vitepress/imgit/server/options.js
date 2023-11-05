/** @typedef Options
 *  @property {RegExp?} regex The asset regex to transform; expects <title> and <uri> capture groups.
 *  @property {string?} localDir Directory where the assets are stored locally in development environment.
 *  @property {string?} serveDir Directory from where the assets are served in production environment.
 *  @property {number?} fetchTimeout How long to wait when downloading remote asset, in seconds.
 *  @property {number?} fetchRetries How many times to restart the download when request fails.
 *  @property {number?} fetchDelay How long to wait before restarting a failed download, in seconds. */

/** @type {Options} */
export const defaults = Object.freeze({
    regex: /!\[(?<title>.*?)]\((?<uri>.+?)\)/g,
    localDir: "./imgit/remote",
    serveDir: "/images/remote",
    fetchTimeout: 30,
    fetchRetries: 3,
    fetchDelay: 6
});

/** @type {Options} */
export const options = { ...defaults };

/** @param {Options} settings */
export function configure(settings) {
    for (const prop in settings)
        if (options.hasOwnProperty(prop))
            options[prop] = settings[prop];
}
