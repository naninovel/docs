import { Context, EncodedAsset } from "../server";

export default function (credentials: unknown):
    (path: string, asset: EncodedAsset, ctx: Context) => Promise<string> {
    return async (path, ctx) => "";
}
