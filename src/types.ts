import type chroma from "chroma-js";

export type HSLColor = {
    h: number;
    s: number;
    l: number;
}

export type WcagLevel = "AA" | "AAA";

export type ContrastOptions = {
    /** WCAG conformance level to check against. Defaults to "AA". */
    level?: WcagLevel;
    /** Large text (≥ 18pt, or ≥ 14pt bold) has a lower contrast threshold. Defaults to false. */
    largeText?: boolean;
}

export type ReadableTextOptions = {
    /** Candidate text colors, ordered by preference on ties. Defaults to black and white. */
    candidates?: string[];
}

export type ColorScaleOptions = {
    /** Number of colors to return, endpoints included. */
    steps: number;
    /** Interpolation color space. Defaults to "lab". */
    mode?: chroma.InterpolationMode;
}

export type ColorSortKey = "hue" | "saturation" | "lightness" | "luminance";

export type SortColorsOptions = {
    by: ColorSortKey;
    /** Defaults to "asc". */
    order?: "asc" | "desc";
}
