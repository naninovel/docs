import { options } from "../../core/options.js";
import { buildHtml } from "../../core/build.js";
import { Replacer } from "./replacer.js";

export const Plugin = () => {
    const regexp = new RegExp(options.regex, "m");
    return Replacer(regexp, m => buildHtml(m[1], m[2]));
};
