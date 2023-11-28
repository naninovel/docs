import { cfg } from "../common";

/** Transforms source document (eg, <code>.md</code>, <code>.jsx</code> or <code>.html</code>)
 *  with specified content replacing configured asset syntax with optimized HTML.
 *  @param content Text content of the document to transform.
 *  @return Transformed content of the document. */
export async function transform(content: string): Promise<string> {
    const captured = await cfg.transform.capture(content);
    const resolved = await cfg.transform.resolve(captured);
    const fetched = await cfg.transform.fetch(resolved);
    const probed = await cfg.transform.probe(fetched);
    const encoded = await cfg.transform.encode(probed);
    const built = await cfg.transform.build(encoded);
    return cfg.transform.rewrite(content, built);
}
