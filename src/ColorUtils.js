"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorUtils = void 0;
const chroma_js_1 = __importDefault(require("chroma-js"));
const color_diff_1 = require("color-diff");
class ColorUtils {
    /**
     * Convert a hex color to an RGB object.
     * @param {string} hex - The hex color string (e.g., '#ff0000').
     * @returns {RGBColor} The RGB color object.
     */
    static hexToRgb(hex) {
        const rgb = (0, chroma_js_1.default)(hex).rgb();
        return { R: rgb[0], G: rgb[1], B: rgb[2] };
    }
    /**
     * Convert a hex color to a LAB object.
     * @param {string} hex - The hex color string (e.g., '#ff0000').
     * @returns {LabColor} The LAB color object.
     */
    static hexToLab(hex) {
        const [L, a, b] = (0, chroma_js_1.default)(hex).lab();
        return { L, a, b };
    }
    /**
     * Get a specified number of distinct colors from a list based on a similarity threshold.
     * @param {string[]} hexColors - The list of hex color strings.
     * @param {number} numColors - The number of distinct colors to retrieve.
     * @param {number} threshold - The threshold for color similarity (lower values mean more similar).
     * @returns {string[]} The list of distinct hex color strings.
     */
    static getDistinctColors(hexColors, numColors, threshold) {
        const distinctColors = [];
        for (let i = 0; i < hexColors.length && distinctColors.length < numColors; i++) {
            const hex = hexColors[i];
            const labColor = this.hexToLab(hex);
            const isDistinct = distinctColors.every(distinctHex => {
                const distinctLab = this.hexToLab(distinctHex);
                return (0, color_diff_1.diff)(labColor, distinctLab) > threshold;
            });
            if (isDistinct) {
                distinctColors.push(hex);
            }
        }
        return distinctColors;
    }
}
exports.ColorUtils = ColorUtils;
