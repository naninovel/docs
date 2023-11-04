import { transform } from "../../core/transform.js";

/** @return {import("vite").Plugin} */
export const Plugin = () => {
    return {
        name: "imgit-transform",
        enforce: "pre",
        transform
    };
};
