/** Result of probing a media content file. */
export type MediaInfo = {
    /** MIME type of the media content. */
    type: string;
    /** Width of the media content, in pixels. */
    width: number;
    /** Height of the media content, in pixels. */
    height: number;
    /** Whether the media content has alpha channel (transparency). */
    alpha: boolean;
};

/** Configures transformation to use when encoding. */
export type EncodeSpec = {
    /** Video codec to use; detects automatically based on out file extension when not specified. */
    codec?: string;
    /** Select frame with specified index (0-based) instead of encoding full stream. */
    select?: number;
    /** Scale to the specified ratio preserving the aspect. */
    scale?: number;
    /** Apply blur with intensity in 0.0 to 1.0 range. */
    blur?: number;
};

/** Implementation is able to probe and encode media files. */
export type Encoder = {
    /** Resolves media info of the file with specified full path. */
    probe: (path: string) => Promise<MediaInfo>;
    /** Encodes and writes media file with specified parameters.
     *  @param path Full path to file to encode (input).
     *  @param out Full path to write encoded file (output).
     *  @param info Media info about the source content.
     *  @param spec Encode specifications.
     *  @return Promise resolved when the file is encoded and written to the file system. */
    encode: (path: string, out: string, info: MediaInfo, spec: EncodeSpec) => Promise<void>;
};
