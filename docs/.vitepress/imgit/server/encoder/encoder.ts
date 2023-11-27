/** Result of probing a media file. */
export type ProbeResult = {
    /** Width of the media content, in pixels. */
    width: number;
    /** Height of the media content, in pixels. */
    height: number;
    /** Whether the media content has alpha channel (transparency). */
    alpha: boolean;
};

/** Parameters of a media encoding operation. */
export type EncodeProps = {
    /** Full path to file to encode. */
    input: string;
    /** Full path to write encoded file. */
    output: string;
    /** Information about the encoded content. */
    probe: ProbeResult;
    /** Quality-related encode parameters. */
    quality: EncodeQuality;
    /** Filter-related encode parameters. */
    filter: EncodeFilter;
    /** Whether single frame should be encoded in case input file has multiple frames. */
    single?: boolean;
};

/** Configures encode quality. */
export type EncodeQuality = {
    /** File size to quality ratio, in 0.0 to 1.0 range; 0 - min. size, 1 - best quality. */
    quality: number;
    /** File size to speed ratio, in 0.0 to 1.0 range; 0 - min. size, 1 - fastest encoding. */
    speed: number;
};

/** Configures transformation to use when encoding. */
export type EncodeFilter = {
    /** When specified, content is scaled to the specified width preserving the aspect. */
    width?: number;
    /** When specified, blur filter is applied with strength in 0.0 to 1.0 range. */
    blur?: number;
};

/** Implementation is able to probe and encode media files. */
export type Encoder = {
    /** Resolves media info of the file with specified path. */
    probe: (path: string) => Promise<ProbeResult>;
    /** Encodes image with specified props. */
    encode: (props: EncodeProps) => Promise<void>;
};
