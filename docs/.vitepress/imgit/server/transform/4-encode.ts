import { ProbedAsset, EncodedAsset } from "../asset";

/** Creates optimized versions of the source asset files. */
export async function encode(assets: ProbedAsset[]): Promise<EncodedAsset[]> {
    return assets.map(a => ({ ...a, encodedPath: "" }));
}

// function encodeAsset(asset: ProbedAsset): EncodedAsset {
//
// }
//
// function buildArgs(asset: ProbedAsset): string {
//
// }
//
// function buildFilter(asset: ProbedAsset): string {
//     return "";
// }
