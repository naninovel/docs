import { config } from "../config";

/** Transforms source document (eg, <code>.md</code>, <code>.js</code> or <code>.html</code>)
 *  with specified content replacing configured asset syntax with optimized HTML.
 *  @param content Text content of the document to transform.
 *  @return Transformed content of the document. */
export function transform(content: string): Promise<string> {
    const { capture, download, probe, encode, build, rewrite } = config.transform;
    return capture(content).then(download).then(probe).then(encode).then(build).then(a => rewrite(content, a));
}
