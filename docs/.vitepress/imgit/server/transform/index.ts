import { Context } from "../common";
import { config } from "../config";

/** Transforms source document (eg, <code>.md</code>, <code>.jsx</code> or <code>.html</code>)
 *  with specified content replacing configured asset syntax with optimized HTML.
 *  @param content Text content of the document to transform.
 *  @param ctx Shared state of the current server run.
 *  @return Transformed content of the document. */
export async function transform(content: string, ctx: Context): Promise<string> {
    const captured = await config.transform.capture(content, ctx);
    const downloaded = await config.transform.download(captured, ctx);
    const probed = await config.transform.probe(downloaded, ctx);
    const encoded = await config.transform.encode(probed, ctx);
    const built = await config.transform.build(encoded, ctx);
    return config.transform.rewrite(content, built, ctx);
}
