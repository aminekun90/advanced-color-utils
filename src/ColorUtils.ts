import chroma from "chroma-js";
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
}
