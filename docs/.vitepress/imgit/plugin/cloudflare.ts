import { EncodedAsset } from "../server/asset";

export default function (credentials: unknown): (path: string, asset: EncodedAsset) => Promise<string> {
    return async (path, asset) => "";
}
