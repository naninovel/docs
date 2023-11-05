import { transform } from "./server/transform";
import { configure } from "./server/options";

/** @param {import("./server/options").Options?} options
 *  @return {(code: string, id: string, ctx: any) => Promise<string>} */
export default function (options = undefined) {
    if (options) configure(options);
    configure({ regex: /<img .*?src="(?<uri>.+?)" .*?alt="(?<title>.*?)".*?>/g });
    return transform;
};
