import chroma, { InterpolationMode } from "chroma-js";
import { diff, LabColor, RGBColor } from "color-diff";
import { LogPerf } from "./decorators/LogPerf";
import { HSLColor } from "./types";

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
     * Convert an HSL color to a hex color string.
     * @param {HSLColor} hsl - The HSL color object.
     * @returns {string} The hex color string.
     */
    public static hslToHex(hsl: HSLColor): string {
        const { h, s, l } = hsl;
        const _h = h / 360;
        const _s = s / 100;
        const _l = l / 100;

        let r: number, g: number, b: number;

        if (_s === 0) {
            r = g = b = _l; // achromatic
        } else {
            const hue2rgb = (p: number, q: number, t: number): number => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = _l < 0.5 ? _l * (1 + _s) : _l + _s - _l * _s;
            const p = 2 * _l - q;
            r = hue2rgb(p, q, _h + 1 / 3);
            g = hue2rgb(p, q, _h);
            b = hue2rgb(p, q, _h - 1 / 3);
        }

        const toHex = (x: number): string => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    /**
     * Convert an RGB color to an HSL color object.
     * @param {RGBColor} rgb - The RGB color object.
     * @returns {HSLColor} The HSL color object.
     */
    public static rgbToHsl(rgb: RGBColor): HSLColor {
        const { R, G, B } = rgb;
        const r = R / 255;
        const g = G / 255;
        const b = B / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h: number = 0, s: number = 0, l: number = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h *= 60;
        }

        return { h, s: s * 100, l: Math.floor(l * 100) };
    }

    /**
     * Convert an HSL color to an RGB color this is an approximation to the nearest RGB color.
     * @param {HSLColor} hsl - The HSL color object.
     * @returns {RGBColor} The RGB color object.
     */
    public static hslToRgb(hsl: HSLColor): RGBColor {
        const { h, s, l } = hsl;
        const _h = h / 360;
        const _s = s / 100;
        const _l = l / 100;

        let r: number, g: number, b: number;

        if (_s === 0) {
            r = g = b = _l; // achromatic
        } else {
            const hue2rgb = (p: number, q: number, t: number): number => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = _l < 0.5 ? _l * (1 + _s) : _l + _s - _l * _s;
            const p = 2 * _l - q;
            r = hue2rgb(p, q, _h + 1 / 3);
            g = hue2rgb(p, q, _h);
            b = hue2rgb(p, q, _h - 1 / 3);
        }

        return { R: Math.round(r * 255), G: Math.round(g * 255), B: Math.round(b * 255) };
    }

    /**
     * Generate a complementary color for a given hex color.
     * @param {string} hex - The hex color string (e.g., '#ff0000').
     * @returns {string} The hex color string of the complementary color.
     */
    public static generateComplementaryColor(hex: string): string {
        const color = chroma(hex);

        if (chroma(hex).luminance() === 1) {
            // Special handling for white
            return '#000000'; // Complementary of white can be black in some systems
        }

        if (chroma(hex).luminance() === 0) {
            // Special handling for black
            return '#ffffff'; // Complementary of black can be white in some systems
        }

        const complementaryColor = color.set('hsl.h', (color.get('hsl.h') + 180) % 360);
        return complementaryColor.hex();
    }

    /**
     * Generate triadic colors based on a base color.
     * @param {string} baseColor - The base HEX color string.
     * @returns {string[]} An array of triadic HEX color strings.
    */
    public static generateTriadicColors(baseColor: string): string[] {
        // Convert base HEX color to HSL
        const baseHsl = this.hexToHsl(baseColor);
        const baseHue = baseHsl.h;

        // Calculate triadic hues
        const hues = [
            baseHue,
            (baseHue + 120) % 360,
            (baseHue + 240) % 360
        ];

        // Convert HSL hues to HEX colors
        const triadicColors = hues.map(hue => {
            // Adjust hue to be within range 0-360
            const adjustedHue = (hue + 360) % 360;

            // Convert HSL to HEX using chroma
            const [r, g, b] = chroma.hsl(adjustedHue, baseHsl.s, baseHsl.l).rgb();
            return chroma.rgb(r, g, b).hex();
        });

        return triadicColors;
    }

    /**
     * Generate a monochromatic color scheme based on a given hex color.
     * @param {string} hex - The hex color string.
     * @param {number} numColors - The number of monochromatic colors to generate.
     * @returns {string[]} An array of hex color strings representing the monochromatic color scheme.
     */
    public static generateMonochromaticColors(hex: string, numColors: number): string[] {
        if (numColors <= 0) {
            return [];
        }
    
        const hsl = this.hexToHsl(hex);
        const colors = [];
    
        for (let i = 0; i < numColors; i++) {
            // Calculate lightness adjustment
            // The adjustment should interpolate between base lightness and 0
            const l = Math.max(0, Math.min(1, hsl.l * (1 - (i / (numColors - 1)))));
    
            colors.push(this.hslToHex({ h: hsl.h, s: hsl.s, l }));
        }
    
        return colors;
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
     * @returns {HSLColor} The HSL color object.
     */
    public static hexToHsl(hex: string): HSLColor {
        const [h, s, l] = chroma(hex).hsl();
        return {
            h: isNaN(h) ? 0 : h,  // Handle NaN hue by setting it to 0
            s: s,
            l: l
        };
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
