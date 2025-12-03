import { ColorUtils } from "@/ColorUtils";
import { generateRandomColor } from "@/helper/generateColor";
import { describe, expect, it } from "vitest";

describe("ColorUtils", () => {
    describe("getDistinctColors", () => {
        it("should return the correct number of distinct colors", () => {
            const colors = ["#ff0000", "#ff1100", "#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffff00", "#000000", "#ffffff"];
            const numberOfColors = 3;
            const threshold = 20;

            const filteredColors = ColorUtils.getDistinctColors(colors, numberOfColors, threshold);
            expect(filteredColors.length).toBe(numberOfColors);
        });

        it("should return distinct colors based on the threshold", () => {
            const colors = ["#ff0000", "#ff0001", "#ff0002", "#00ff00", "#0000ff"];
            const numberOfColors = 2;
            const threshold = 2;

            const filteredColors = ColorUtils.getDistinctColors(colors, numberOfColors, threshold);
            expect(filteredColors).toEqual(expect.arrayContaining(["#ff0000", "#00ff00"]));
        });

        it("should return empty array when empty colors are given", () => {
            const colors: Array<string> = [];
            const filteredColors = ColorUtils.getDistinctColors(colors, 2, 2);
            expect(filteredColors).toStrictEqual([]);
        });

        it("should return empty array numberOfColors is 0", () => {
            const colors = ["#ff0000", "#00ff00"];
            const filteredColors = ColorUtils.getDistinctColors(colors, 0, 2);
            expect(filteredColors).toStrictEqual([]);
        });
    });

    describe('ColorUtils Performance', () => {
        it('should efficiently find distinct colors', () => {
            const numberOfColors = 10_000;
            // Mock random generation if generateRandomColor is not available, or use the real one
            const colors = Array.from({ length: numberOfColors }, () => generateRandomColor());

            const numColorsToRetrieve = 3;
            const threshold = 20;

            const start = performance.now();
            const distinctColors = ColorUtils.getDistinctColors(colors, numColorsToRetrieve, threshold);
            const end = performance.now();

            console.log(`getDistinctColors took ${(end - start).toFixed(2)} ms`);
            expect(Array.isArray(distinctColors)).toBe(true);
            expect(distinctColors.length).toBe(numColorsToRetrieve);
        });
    });

    describe('ColorUtils Features', () => {
        it('should generate a complementary color', () => {
            const complementaryColor = ColorUtils.getComplementaryColor('#ff0000');
            // Assuming complementary of Red is Cyan
            expect(complementaryColor.toLowerCase()).toBe('#00ffff');
        });

        it('should generate a color palette', () => {
            const palette = ColorUtils.generateComplementaryPalette('#ff0000', 5);
            expect(palette.length).toBe(5);
            for (const color of palette) {
                expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
            }
        });

        it('should convert RGB to Hex', () => {
            const rgb = { R: 255, G: 0, B: 0 };
            const hex = ColorUtils.rgbToHex(rgb);
            expect(hex.toLowerCase()).toBe('#ff0000');
        });

        it('should convert LAB to Hex', () => {
            const lab = { L: 53.23288, a: 80.10933, b: 67.22006 };
            const hex = ColorUtils.labToHex(lab);
            // Allow for minor rounding differences in LAB conversion
            expect(hex.toLowerCase()).toMatch(/#ff0000|#fe0000|#ff0001/);
        });

        it('should convert hex to RGB correctly', () => {
            expect(ColorUtils.hexToRgb('#ff0000')).toEqual({ R: 255, G: 0, B: 0 });
            expect(ColorUtils.hexToRgb('#0f0')).toEqual({ R: 0, G: 255, B: 0 }); // Shorthand
            expect(ColorUtils.hexToRgb('#00FF00')).toEqual({ R: 0, G: 255, B: 0 }); // Case-insensitive
            expect(ColorUtils.hexToRgb('#000000')).toEqual({ R: 0, G: 0, B: 0 });
            expect(ColorUtils.hexToRgb('#ffffff')).toEqual({ R: 255, G: 255, B: 255 });
        });
    });

    describe('generateAnalogousColors', () => {
        it('should generate analogous colors correctly', () => {
            const hex = '#ff0000';
            const numColors = 2;
            const analogousColors = ColorUtils.generateAnalogousColors(hex, numColors);

            expect(analogousColors.length).toBe(numColors);
            // Based on typical 30 degree steps
            expect(analogousColors.map(c => c.toLowerCase())).toEqual(['#ff8000', '#ff0080']);
        });
    });

    describe('generateShades & Tints', () => {
        it('should generate shades (darker)', () => {
            const hex = '#ff0000';
            const shades = ColorUtils.generateShades(hex, 5);
            expect(shades[0].toLowerCase()).toBe(hex);
            expect(shades[4]).toBe('#000000');
        });

        it('should generate tints (lighter)', () => {
            const hex = '#ff0000';
            const tints = ColorUtils.generateTints(hex, 5);
            expect(tints[0].toLowerCase()).toBe(hex);
            expect(tints[4]).toBe('#ffffff');
        });
    });

    describe('blendColors', () => {
        it('should blend two colors correctly', () => {
            const color1 = '#ff0000';
            const color2 = '#0000ff';
            // We use simple string matching here to avoid needing external deps
            const blended = ColorUtils.blendColors(color1, color2, 0.5, 'lab');
            expect(blended).toMatch(/^#[0-9a-fA-F]{6}$/);
        });

        it('should respect blend ratios', () => {
            const c1 = '#ff0000';
            const c2 = '#0000ff';
            expect(ColorUtils.blendColors(c1, c2, 0, 'lab').toLowerCase()).toBe(c1);
            expect(ColorUtils.blendColors(c1, c2, 1, 'lab').toLowerCase()).toBe(c2);
        });
    });

    describe('getContrastRatio', () => {
        it('should calculate contrast ratio', () => {
            expect(ColorUtils.getContrastRatio('#000000', '#ffffff')).toBeGreaterThan(20); // Max is 21
            expect(ColorUtils.getContrastRatio('#ff0000', '#ff0000')).toBe(1);
        });
    });

    describe('generateRandomColor', () => {
        it('should generate valid hex', () => {
            expect(ColorUtils.generateRandomColor()).toMatch(/^#[0-9a-fA-F]{6}$/);
        });
    });

    describe('HSL / RGB Conversions', () => {
        it('should convert RGB to HSL correctly', () => {
            expect(ColorUtils.rgbToHsl({ R: 255, G: 0, B: 0 })).toEqual({ h: 0, s: 100, l: 50 });
            expect(ColorUtils.rgbToHsl({ R: 0, G: 255, B: 0 })).toEqual({ h: 120, s: 100, l: 50 });
            expect(ColorUtils.rgbToHsl({ R: 255, G: 255, B: 255 })).toEqual({ h: 0, s: 0, l: 100 });
        });

        it('should convert HSL to RGB correctly', () => {
            expect(ColorUtils.hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ R: 255, G: 0, B: 0 });
            expect(ColorUtils.hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ R: 0, G: 255, B: 0 });
        });
    });

    describe('generateTriadicColors', () => {
        it('should generate triadic colors correctly', () => {
            const base = '#ff0000';
            const triadic = ColorUtils.generateTriadicColors(base);

            // Red (0°), Green (120°), Blue (240°)
            // Removed 'chroma-js' dependency in favor of exact checks or regex
            const expected = ['#ff0000', '#00ff00', '#0000ff'];

            expect(triadic.length).toBe(3);
            expect(triadic[0].toLowerCase()).toBe(expected[0]);

            // Allow for tiny rounding errors if internal math is float-based
            // But usually 0, 120, 240 degrees on pure red results in pure G/B
            expect(triadic[1].toLowerCase()).toBe(expected[1]);
            expect(triadic[2].toLowerCase()).toBe(expected[2]);
        });
    });

    describe('generateMonochromaticColors', () => {
        it('should generate decreasing lightness colors', () => {
            const base = '#0000ff';
            const mono = ColorUtils.generateMonochromaticColors(base, 4);

            expect(mono.length).toBe(4);

            // Verify lightness decreases
            const lightnesses = mono.map(c => ColorUtils.hexToHsl(c).l);
            for (let i = 0; i < lightnesses.length - 1; i++) {
                expect(lightnesses[i]).toBeGreaterThanOrEqual(lightnesses[i + 1]);
            }
        });
    });
});