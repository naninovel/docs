/** Result of probing a media file. */
export type ProbeResult = {
    /** Width of the media content, in pixels. */
    width: number;
    /** Height of the media content, in pixels. */
    height: number;
    /** Whether the media content has alpha channel (transparency). */
    alpha: boolean;
};

/** Configures transformation to use when encoding. */
export type EncodeSpec = {
    /** File size to visual quality ratio, in 0.0 to 1.0 range;
     *  0 - min. size, 1 - best quality (lossless or perceptually indistinguishable from the source). */
    quality: number;
    /** File size to encode speed ratio, in 0.0 to 1.0 range;
     *  0 - min. size, 1 - fastest encoding (at build time, doesn't affect client/runtime). */
    speed: number;
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
    probe: (path: string) => Promise<ProbeResult>;
    /** Encodes and writes media file with specified parameters.
     *  @param src Full path to file to encode.
     *  @param out Full path to write encoded file.
     *  @param probe Media info about the source content.
     *  @param spec Encode specifications.
     *  @return Promise resolved when the file is encoded and written to the file system. */
    encode: (src: string, out: string, probe: ProbeResult, spec: EncodeSpec) => Promise<void>;
};
