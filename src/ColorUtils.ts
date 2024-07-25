import chroma, { InterpolationMode } from "chroma-js";
import { diff, LabColor, RGBColor } from "color-diff";
import { LogPerf } from "@color-utils/decorators/LogPerf";

export class ColorUtils {

    /**
     * Generate a complementary color for a given hex color.
     * @param {string} hex - The hex color string (e.g., '#ff0000').
     * @returns {string} The complementary hex color string.
     */
    public static getComplementaryColor(hex: string): string {
        const complementary = chroma(hex).set('hsl.h', (chroma(hex).get('hsl.h') + 180) % 360);
        return complementary.hex();
    }

    /**
    * Generate a color palette based on a given hex color and the desired number of colors.
    * @param {string} hex - The hex color string (e.g., '#ff0000').
    * @param {number} numColors - The number of colors in the palette.
    * @returns {string[]} The array of hex color strings in the palette.
    */
    public static generateColorPalette(hex: string, numColors: number): string[] {
        return chroma.scale([hex, chroma(hex).set('hsl.h', (chroma(hex).get('hsl.h') + 180) % 360)])
            .mode('lab')
            .colors(numColors);
    }

    /**
    * Convert an RGB color to a hex color string.
    * @param {RGBColor} rgb - The RGB color object.
    * @returns {string} The hex color string.
    */
    public static rgbToHex(rgb: RGBColor): string {
        return chroma(rgb.R, rgb.G, rgb.B).hex();
    }

    /**
    * Convert a hex color to an RGB object.
    * @param {string} hex - The hex color string (e.g., "#ff0000").
    * @returns {RGBColor} The RGB color object.
    */
    public static hexToRgb(hex: string): RGBColor {
        const rgb = chroma(hex).rgb();
        return { R: rgb[0], G: rgb[1], B: rgb[2] };
    }

    /**
    * Convert a LAB color to a hex color string.
    * @param {LabColor} lab - The LAB color object.
    * @returns {string} The hex color string.
    */
    public static labToHex(lab: LabColor): string {
        return chroma.lab(lab.L, lab.a, lab.b).hex();
    }

    /**
     * Convert a hex color to a LAB object.
     * @param {string} hex - The hex color string (e.g., "#ff0000").
     * @returns {LabColor} The LAB color object.
     */
    private static hexToLab(hex: string): LabColor {
        const [L, a, b] = chroma(hex).lab();
        return { L, a, b };
    }

    /**
    * Get a specified number of distinct colors from a list based on a similarity threshold.
    * @param {string[]} hexColors - The list of hex color strings.
    * @param {number} numColors - The number of distinct colors to retrieve.
    * @param {number} threshold - The threshold for color similarity (lower values mean more similar).
    * @returns {string[]} The list of distinct hex color strings.
    */
    @LogPerf("info")
    public static getDistinctColors(hexColors: string[], numColors: number, threshold: number): string[] {
        if (numColors <= 0) return [];

        const distinctColors: string[] = [];
        const labColors = hexColors.map(hex => this.hexToLab(hex));

        for (let i = 0; i < labColors.length && distinctColors.length < numColors; i++) {
            const labColor = labColors[i];
            const isDistinct = distinctColors.every(distinctHex => {
                const distinctLab = this.hexToLab(distinctHex);
                return diff(labColor, distinctLab) > threshold;
            });

            if (isDistinct) {
                distinctColors.push(hexColors[i]);
            }
        }

        return distinctColors;
    }

    /**
     * Generate shades of a given hex color.
     * @param {string} hex - The hex color string.
     * @param {number} numShades - The number of shades to generate.
     * @returns {string[]} The array of hex color strings representing the shades.
     */
    public static generateShades(hex: string, numShades: number): string[] {
        if (numShades <= 0) return [];

        const color = chroma(hex);
        // Create a scale from the original color to black
        const scale = chroma.scale([color, '#000000']).mode('lab').colors(numShades);

        return scale;
    }

    /**
     * Generate tints of a given hex color.
     * @param {string} hex - The hex color string.
     * @param {number} numTints - The number of tints to generate.
     * @returns {string[]} The array of hex color strings representing the tints.
     */
    public static generateTints(hex: string, numTints: number): string[] {
        if (numTints <= 0) return [];

        const color = chroma(hex);
        // Create a scale from the original color to white
        const scale = chroma.scale([color, '#ffffff']).mode('lab').colors(numTints);

        return scale;
    }

     /**
     * Blend two hex colors together.
     * @param {string} color1 - The first hex color string.
     * @param {string} color2 - The second hex color string.
     * @param {number} ratio - The ratio of blending (0 to 1). 0 means full color1, 1 means full color2.
     * @param {InterpolationMode} [colorSpace='lab'] - The color space to use for blending (default is 'lab').
     * @returns {string} The blended hex color string.
     */
     public static blendColors(color1: string, color2: string, ratio: number, colorSpace: InterpolationMode = 'lab'): string {
         // Ensure ratio is between 0 and 1
         ratio = Math.max(0, Math.min(1, ratio));
         // Use chroma to blend the two colors in the specified color space
         return chroma.mix(color1, color2, ratio, colorSpace).hex();
    }

    /**
     * Convert a hex color to an HSL color object.
     * @param {string} hex - The hex color string.
     * @returns {object} The HSL color object.
     */
    public static hexToHsl(hex: string): { H: number, S: number, L: number } {
        const [h, s, l] = chroma(hex).hsl();
        return { H: h, S: s, L: l };
    }

    /**
     * Calculate the contrast ratio between two colors.
     * @param {string} color1 - The first hex color string.
     * @param {string} color2 - The second hex color string.
     * @returns {number} The contrast ratio.
     */
    public static getContrastRatio(color1: string, color2: string): number {
        return chroma.contrast(color1, color2);
    }

    /**
     * Generate a random hex color string.
     * @returns {string} The random hex color string.
     */
    public static generateRandomColor(): string {
        return chroma.random().hex();
    }

    /**
     * Generate analogous colors for a given hex color.
     * @param {string} hex - The hex color string.
     * @param {number} numColors - The number of analogous colors to generate.
     * @returns {string[]} The array of hex color strings representing the analogous colors.
     */
    public static generateAnalogousColors(hex: string, numColors: number): string[] {
        const angle = 30; // Angle difference for analogous colors
        const baseHue = chroma(hex).get('hsl.h');
        const analogousColors = [];

        for (let i = 1; i <= numColors; i++) {
            const hueOffset = angle * i;
            const color1 = chroma(hex).set('hsl.h', (baseHue + hueOffset) % 360).hex();
            const color2 = chroma(hex).set('hsl.h', (baseHue - hueOffset + 360) % 360).hex();
            analogousColors.push(color1, color2);
        }

        // Slice the array to the required number of colors
        return analogousColors.slice(0, numColors);
    }
}
