import chroma from "chroma-js";
import { diff, LabColor, RGBColor } from "color-diff";
import { LogPerf } from "@color-utils/decorators/LogPerf";

export class ColorUtils {

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

        outerLoop: for (let i = 0; i < labColors.length; i++) {
            const labColor = labColors[i];
            for (let j = 0; j < distinctColors.length; j++) {
                const distinctLab = this.hexToLab(distinctColors[j]);
                if (diff(labColor, distinctLab) <= threshold) {
                    continue outerLoop;
                }
            }
            if (distinctColors.length < numColors) {
                distinctColors.push(hexColors[i]);
            } else {
                break;
            }
        }

        return distinctColors;
    }
}
