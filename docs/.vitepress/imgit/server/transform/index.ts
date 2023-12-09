import { captureAll } from "./1-capture";
import { resolveAll } from "./2-resolve";
import { fetchAll } from "./3-fetch";
import { probeAll } from "./4-probe";
import { encodeAll } from "./5-encode";
import { buildAll } from "./6-build";
import { rewriteAll } from "./7-rewrite";

/** Transforms source document (eg, <code>.md</code>, <code>.jsx</code> or <code>.html</code>)
 *  with specified content replacing configured asset syntax with optimized HTML.
 *  @param id Document's file name or another identifier in the context of build procedure.
 *  @param content Text content of the document to transform.
 *  @return Transformed content of the document. */
export async function transform(id: string, content: string): Promise<string> {
    const captured = await captureAll(id, content);
    const resolved = await resolveAll(captured);
    const fetched = await fetchAll(resolved);
    const probed = await probeAll(fetched);
    const encoded = await encodeAll(probed);
    const built = await buildAll(encoded);
    return rewriteAll(id, content, built);
}
