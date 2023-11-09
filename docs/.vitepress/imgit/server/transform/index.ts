import { config } from "../config";

/** Transforms source code document (eg, <code>.md</code>, <code>.js</code> or <code>.html</code>)
 *  with specified filename and content replacing configured asset syntax with optimized HTML.
 *  @param path Full file path of the transformed document.
 *  @param content Text content of the document to transform.
 *  @return Transformed content of the document. */
export async function transform(path: string, content: string): Promise<string> {
    const captured = await config.transform.capture(path, content);
    const downloaded = await config.transform.download(path, captured);
    const probed = await config.transform.probe(path, downloaded);
    const encoded = await config.transform.encode(path, probed);
    const built = await config.transform.build(path, encoded);
    return config.transform.rewrite(path, content, built);
}
