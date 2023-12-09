import { CapturedAsset, ResolvedAsset, FetchedAsset, ProbedAsset, EncodedAsset, BuiltAsset } from "../asset";

/** External imgit extension. */
export type Plugin = {
    /** Custom procedure to capture asset syntax. Given id (filename) and content (text) of transformed document
     *  populate provided assets array and return true or return false when can't or shouldn't handle the document,
     *  in which case it'll be handled by next procedures in the plugin chain. */
    capture?: (id: string, content: string, assets: CapturedAsset[]) => boolean | Promise<boolean>;
    /** Custom asset resolver. Given captured asset syntax, resolves asset type,
     *  content locations and specs (in-place). Return false when the resolver can't or shouldn't
     *  handle the asset, in which case it'll be handled by next resolvers in the plugin chain. */
    resolve?: (asset: ResolvedAsset) => boolean | Promise<boolean>;
    /** Custom asset downloader. Given resolved asset, fetches source content and assigns file's full path on
     *  local file system to the asset (in-place). Return false when the fetcher can't or shouldn't handle the asset,
     *  in which case it'll be handled by next fetchers in the plugin chain. */
    fetch?: (asset: FetchedAsset) => boolean | Promise<boolean>;
    /** Custom content info resolver. Given fetched asset, resolves and assigns media content
     *  information (in-place). Return false when the implementation can't or shouldn't handle the asset,
     *  in which case it'll be handled by next probe handlers in the plugin chain. */
    probe?: (asset: ProbedAsset) => boolean | Promise<boolean>;
    /** Custom content encoder. Given probed asset, encodes and assigns full file paths to the encoded content
     *  files (in-place). Return false when the implementation can't or shouldn't encode the asset,
     *  in which case it'll be handled by next encoders in the plugin chain. */
    encode?: (asset: EncodedAsset) => boolean | Promise<boolean>;
    /** Custom asset HTML builder. Given encoded asset(s), build HTML (in-place for all the input
     *  assets) to replace captured syntax in the transformed document. May include additional merged
     *  assets when associated syntax were joined via "merge" spec. Return false when the builder can't
     *  or shouldn't  handle the assets, in which case they'll be handled by next builders in the plugin chain. */
    build?: (asset: BuiltAsset, merges?: BuiltAsset[]) => boolean | Promise<boolean>;
    /** Custom asset server. Given full path to a content file and associated asset info,
     *  return URL under which the file will be served and prepare the file to be served (eg, copy to
     *  the static assets dir or upload to a CDN). Return null when the server can't or shouldn't
     *  handle the asset, in which case it'll be handled by next servers in the plugin chain. */
    serve?: (path: string, asset: Readonly<BuiltAsset>) => null | Promise<string | null>;
    /** Custom procedure to rewrite captured assets syntax with built HTML. Given id (filename) and content (text)
     *  of transformed document return overwritten content or false when can't or shouldn't handle the case,
     *  in which case it'll be handled by next procedures in the plugin chain. */
    rewrite?: (id: string, content: string, assets: BuiltAsset[]) => (string | null) | Promise<string | null>;
    /** When specified, will inject returned file path as client JavaScript module. */
    inject?: () => string;
};
