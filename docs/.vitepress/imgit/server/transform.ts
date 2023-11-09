import { options } from "./options";

/** Transforms source code document (eg, <code>.md</code>, <code>.js</code> or <code>.html</code>)
 *  with specified filename and content replacing configured asset syntax with optimized HTML.
 *  @param path Full file path of the transformed document.
 *  @param content Text content of the document to transform.
 *  @return Transformed content of the document. */
export async function transform(path: string, content: string): Promise<string> {
    const captures = await options.transform.capture(path, content);
    const downloads = await options.transform.download(path, captures);
    return content;

    // async function handleMatch(match: RegExpMatchArray) {
    //     const html = await buildHtml(type, match.groups.title, match.groups.uri);
    //     content = content.replaceAll(match[0], html);
    // }
    //
    // async function buildHtml(type: AssetType, title: string, url: string): Promise<string> {
    //     if (type === AssetType.YouTube)
    //         return buildYouTube(title, url);
    //     const source = await resolveSource(url);
    //     return type === AssetType.Image
    //         ? buildImage(title, source)
    //         : buildVideo(title, source);
    // }
    //
    // async function resolveSource(uri: string): Promise<string> {
    //
    //
    //     await download(uri, filepath);
    //     const info = await probe(filepath);
    //     return `${options.serve}/${filename}?width=${info.width}&height=${info.height}`;
    // }
}
