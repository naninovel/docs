import { Context } from "../common";
import { cfg } from "../config";

/** Transforms source document (eg, <code>.md</code>, <code>.jsx</code> or <code>.html</code>)
 *  with specified content replacing configured asset syntax with optimized HTML.
 *  @param content Text content of the document to transform.
 *  @param ctx Shared state of the current build operation.
 *  @return Transformed content of the document. */
export async function transform(content: string, ctx: Context): Promise<string> {
    const captured = await cfg.transform.capture(content, ctx);
    const downloaded = await cfg.transform.download(captured, ctx);
    const probed = await cfg.transform.probe(downloaded, ctx);
    const encoded = await cfg.transform.encode(probed, ctx);
    const built = await cfg.transform.build(encoded, ctx);
    return cfg.transform.rewrite(content, built, ctx);
}
