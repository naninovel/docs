import { cfg } from "../common";

export { capture } from "./1-capture";
export { resolve } from "./2-resolve";
export { fetch } from "./3-fetch";
export { probe } from "./4-probe";
export { encode } from "./5-encode";
export { build } from "./6-build";
export { rewrite } from "./7-rewrite";

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
