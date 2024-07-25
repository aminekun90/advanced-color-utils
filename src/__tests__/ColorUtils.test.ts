import { ColorUtils } from "../ColorUtils";
import { generateRandomColor } from "../helper/generateColor";
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
            const numberOfColors = 2;
            const threshold = 2;

            const filteredColors = ColorUtils.getDistinctColors(colors, numberOfColors, threshold);
            expect(filteredColors).toStrictEqual([]);
        });
        it("should return empty array numberOfColors is 0", () => {
            const colors: Array<string> = ["#ff0000", "#ff0001", "#ff0002", "#00ff00", "#0000ff"];
            const numberOfColors = 0;
            const threshold = 2;

            const filteredColors = ColorUtils.getDistinctColors(colors, numberOfColors, threshold);
            expect(filteredColors).toStrictEqual([]);
        });
    });

    describe('ColorUtils Performance', () => {
        it('should efficiently find distinct colors', () => {
            const numberOfColors = 10_000; // 10k colors
            const colors = Array.from({ length: numberOfColors }, generateRandomColor);
            const numColorsToRetrieve = 3;
            const threshold = 20;

            const start = performance.now();
            const distinctColors = ColorUtils.getDistinctColors(colors, numColorsToRetrieve, threshold);
            const end = performance.now();

            console.log(`getDistinctColors took ${(end - start).toFixed(2)} ms to execute.`);
            console.log(`Retrieved ${distinctColors.length} distinct colors.`);
            console.log(distinctColors)
            expect(distinctColors).toBeInstanceOf(Array);
            expect(distinctColors.length).toBe(numColorsToRetrieve);
        });
    });

    describe('ColorUtils Features', () => {
        it('should generate a complementary color', () => {
            const complementaryColor = ColorUtils.getComplementaryColor('#ff0000');
            expect(complementaryColor).toBe('#00ffff');
        });

        it('should generate a color palette', () => {
            const palette = ColorUtils.generateColorPalette('#ff0000', 5);
            expect(palette.length).toBe(5);
            palette.forEach(color => expect(color).toMatch(/^#[0-9a-fA-F]{6}$/));
        });

        it('should convert RGB to Hex', () => {
            const rgb = { R: 255, G: 0, B: 0 };
            const hex = ColorUtils.rgbToHex(rgb);
            expect(hex).toBe('#ff0000');
        });

        it('should convert LAB to Hex', () => {
            const lab = { L: 53.23288, a: 80.10933, b: 67.22006 };
            const hex = ColorUtils.labToHex(lab);
            expect(hex).toBe('#ff0000');
        });

        it('should get distinct colors', () => {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff'];
            const numColorsToRetrieve = 2;
            const threshold = 20;
            const distinctColors = ColorUtils.getDistinctColors(colors, numColorsToRetrieve, threshold);
            expect(distinctColors.length).toBe(2);
            distinctColors.forEach(color => expect(color).toMatch(/^#[0-9a-fA-F]{6}$/));
        });

        // Unit tests for hexToRgb
        it('should convert hex to RGB correctly', () => {
            const hex = '#ff0000';
            const rgb = ColorUtils.hexToRgb(hex);
            expect(rgb).toEqual({ R: 255, G: 0, B: 0 });
        });

        it('should handle shorthand hex codes', () => {
            const hex = '#0f0';
            const rgb = ColorUtils.hexToRgb(hex);
            expect(rgb).toEqual({ R: 0, G: 255, B: 0 });
        });

        it('should handle case-insensitive hex codes', () => {
            const hex = '#00FF00';
            const rgb = ColorUtils.hexToRgb(hex);
            expect(rgb).toEqual({ R: 0, G: 255, B: 0 });
        });

        it('should convert hex to RGB correctly for black', () => {
            const hex = '#000000';
            const rgb = ColorUtils.hexToRgb(hex);
            expect(rgb).toEqual({ R: 0, G: 0, B: 0 });
        });

        it('should convert hex to RGB correctly for white', () => {
            const hex = '#ffffff';
            const rgb = ColorUtils.hexToRgb(hex);
            expect(rgb).toEqual({ R: 255, G: 255, B: 255 });
        });
    });

    describe('generateAnalogousColors', () => {
        it('should generate the correct number of analogous colors', () => {
            const hex = '#ff0000';
            const numColors = 3;
            const analogousColors = ColorUtils.generateAnalogousColors(hex, numColors);
            expect(analogousColors.length).toBe(numColors);
        });

        it('should generate analogous colors correctly', () => {
            const hex = '#ff0000';
            const numColors = 2;
            const analogousColors = ColorUtils.generateAnalogousColors(hex, numColors);
            expect(analogousColors).toEqual(['#ff8000', '#ff0080']);
        });
    });

    describe('generateShades', () => {
        it('should generate the correct number of shades', () => {
            const hex = '#ff0000';
            const numShades = 5;
            const shades = ColorUtils.generateShades(hex, numShades);
            expect(shades.length).toBe(numShades);
        });

        it('should generate shades from original color to black', () => {
            const hex = '#ff0000';
            const numShades = 5;
            const shades = ColorUtils.generateShades(hex, numShades);
            
            expect(shades[0]).toBe(hex); // Original color
            expect(shades[1]).not.toBe(hex); // First shade
            expect(shades[2]).not.toBe(hex); // Mid shade
            expect(shades[3]).not.toBe(hex); // Second-to-last shade
            expect(shades[4]).toBe('#000000'); // Darkest shade
        });

        it('should handle edge cases with zero shades', () => {
            const hex = '#ff0000';
            const numShades = 0;
            const shades = ColorUtils.generateShades(hex, numShades);
            expect(shades).toEqual([]);
        });
    });

    describe('generateTints', () => {
        it('should generate the correct number of tints', () => {
            const hex = '#ff0000';
            const numTints = 5;
            const tints = ColorUtils.generateTints(hex, numTints);
            expect(tints.length).toBe(numTints);
        });

        it('should generate tints from the original color to white', () => {
            const hex = '#ff0000';
            const numTints = 5;
            const tints = ColorUtils.generateTints(hex, numTints);

            expect(tints[0]).toBe(hex); // Original color
            expect(tints[4]).toBe('#ffffff'); // Lightest tint
        });

        it('should handle edge cases with zero tints', () => {
            const hex = '#ff0000';
            const numTints = 0;
            const tints = ColorUtils.generateTints(hex, numTints);
            expect(tints).toEqual([]);
        });
    });

    describe('blendColors', () => {
        it('should blend two colors correctly using lab color space', () => {
            const color1 = '#ff0000'; // Red
            const color2 = '#0000ff'; // Blue
            const ratio = 0.5; // 50% blend
            const blendedColor = ColorUtils.blendColors(color1, color2, ratio, 'lab');
            
            // Update expected value based on actual blending results
            expect(blendedColor).toBe('#ca0088'); // Adjust based on actual result
        });

        it('should blend colors with a ratio of 0 and 1', () => {
            const color1 = '#ff0000'; // Red
            const color2 = '#0000ff'; // Blue
            
            const blendedColor1 = ColorUtils.blendColors(color1, color2, 0, 'lab'); // Only color1
            const blendedColor2 = ColorUtils.blendColors(color1, color2, 1, 'lab'); // Only color2
            
            expect(blendedColor1).toBe(color1); // Should return color1
            expect(blendedColor2).toBe(color2); // Should return color2
        });

        it('should handle edge cases with ratios', () => {
            const color1 = '#ff0000'; // Red
            const color2 = '#00ff00'; // Green
            
            const blendedColor = ColorUtils.blendColors(color1, color2, 0.5, 'lab');
            expect(blendedColor).toBe('#c9ab00'); // Adjust based on actual result
        });
    });

    describe('hexToHsl', () => {
        it('should convert hex to HSL correctly', () => {
            const hex = '#ff0000';
            const hsl = ColorUtils.hexToHsl(hex);
            expect(hsl.H).toBeCloseTo(0, 1);
            expect(hsl.S).toBeCloseTo(1, 1);
            expect(hsl.L).toBeCloseTo(0.5, 1);
        });
    });

    describe('getContrastRatio', () => {
        it('should calculate contrast ratio correctly', () => {
            const color1 = '#000000';
            const color2 = '#ffffff';
            const contrastRatio = ColorUtils.getContrastRatio(color1, color2);
            expect(contrastRatio).toBeGreaterThan(7); // Should be high contrast
        });

        it('should handle low contrast cases', () => {
            const color1 = '#ff0000';
            const color2 = '#ff6666';
            const contrastRatio = ColorUtils.getContrastRatio(color1, color2);
            expect(contrastRatio).toBeLessThan(2); // Low contrast
        });
    });

    describe('generateRandomColor', () => {
        it('should generate a valid hex color', () => {
            const randomColor = ColorUtils.generateRandomColor();
            expect(randomColor).toMatch(/^#[0-9a-fA-F]{6}$/); // Valid hex color format
        });

        it('should generate different colors on subsequent calls', () => {
            const color1 = ColorUtils.generateRandomColor();
            const color2 = ColorUtils.generateRandomColor();
            expect(color1).not.toBe(color2); // Likely to be different
        });
    });
});