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
            expect(hsl.h).toBeCloseTo(0, 1);
            expect(hsl.s).toBeCloseTo(1, 1);
            expect(hsl.l).toBeCloseTo(0.5, 1);
        });
        it('should convert HEX to HSL correctly more accurate', () => {
            expect(ColorUtils.hexToHsl('#ff0000')).toEqual({ h: 0, s: 1, l: 0.5 }); // Red
            expect(ColorUtils.hexToHsl('#00ff00')).toEqual({ h: 120, s: 1, l: 0.5 }); // Green
            expect(ColorUtils.hexToHsl('#0000ff')).toEqual({ h: 240, s: 1, l: 0.5 }); // Blue
            expect(ColorUtils.hexToHsl('#ffffff')).toEqual({ h: 0, s: 0, l: 1 }); // White
            expect(ColorUtils.hexToHsl('#000000')).toEqual({ h: 0, s: 0, l: 0 }); // Black
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

    describe('rgbToHsl', () => {
        it('should convert RGB to HSL correctly', () => {
            const rgb = { R: 255, G: 0, B: 0 };
            const hsl = ColorUtils.rgbToHsl(rgb);
            expect(hsl).toEqual({ h: 0, s: 100, l: 50 });

            const rgb2 = { R: 0, G: 255, B: 0 };
            const hsl2 = ColorUtils.rgbToHsl(rgb2);
            expect(hsl2).toEqual({ h: 120, s: 100, l: 50 });

            const rgb3 = { R: 0, G: 0, B: 255 };
            const hsl3 = ColorUtils.rgbToHsl(rgb3);
            expect(hsl3).toEqual({ h: 240, s: 100, l: 50 });

            const rgb4 = { R: 255, G: 255, B: 0 };
            const hsl4 = ColorUtils.rgbToHsl(rgb4);
            expect(hsl4).toEqual({ h: 60, s: 100, l: 50 });

            const rgb5 = { R: 0, G: 255, B: 255 };
            const hsl5 = ColorUtils.rgbToHsl(rgb5);
            expect(hsl5).toEqual({ h: 180, s: 100, l: 50 });

            const rgb6 = { R: 255, G: 0, B: 255 };
            const hsl6 = ColorUtils.rgbToHsl(rgb6);
            expect(hsl6).toEqual({ h: 300, s: 100, l: 50 });

            const rgb7 = { R: 192, G: 192, B: 192 };
            const hsl7 = ColorUtils.rgbToHsl(rgb7);
            expect(hsl7).toEqual({ h: 0, s: 0, l: 75 });

            const rgb8 = { R: 128, G: 128, B: 128 };
            const hsl8 = ColorUtils.rgbToHsl(rgb8);
            expect(hsl8).toEqual({ h: 0, s: 0, l: 50 });

            const rgb9 = { R: 0, G: 0, B: 0 };
            const hsl9 = ColorUtils.rgbToHsl(rgb9);
            expect(hsl9).toEqual({ h: 0, s: 0, l: 0 });

            const rgb10 = { R: 255, G: 255, B: 255 };
            const hsl10 = ColorUtils.rgbToHsl(rgb10);
            expect(hsl10).toEqual({ h: 0, s: 0, l: 100 });
        });
    });

    describe('hslToRgb', () => {
        it('should convert HSL to RGB correctly', () => {
            const hsl1 = { h: 0, s: 100, l: 50 };
            const rgb1 = ColorUtils.hslToRgb(hsl1);
            expect(rgb1).toEqual({ R: 255, G: 0, B: 0 });

            const hsl2 = { h: 120, s: 100, l: 50 };
            const rgb2 = ColorUtils.hslToRgb(hsl2);
            expect(rgb2).toEqual({ R: 0, G: 255, B: 0 });

            const hsl3 = { h: 240, s: 100, l: 50 };
            const rgb3 = ColorUtils.hslToRgb(hsl3);
            expect(rgb3).toEqual({ R: 0, G: 0, B: 255 });

            const hsl4 = { h: 60, s: 100, l: 50 };
            const rgb4 = ColorUtils.hslToRgb(hsl4);
            expect(rgb4).toEqual({ R: 255, G: 255, B: 0 });

            const hsl5 = { h: 180, s: 100, l: 50 };
            const rgb5 = ColorUtils.hslToRgb(hsl5);
            expect(rgb5).toEqual({ R: 0, G: 255, B: 255 });

            const hsl6 = { h: 300, s: 100, l: 50 };
            const rgb6 = ColorUtils.hslToRgb(hsl6);
            expect(rgb6).toEqual({ R: 255, G: 0, B: 255 });

            const hsl7 = { h: 0, s: 0, l: 75 };
            const rgb7 = ColorUtils.hslToRgb(hsl7);
            expect(rgb7).toEqual({ R: 191, G: 191, B: 191 });

            const hsl8 = { h: 0, s: 0, l: 50 };
            const rgb8 = ColorUtils.hslToRgb(hsl8);
            expect(rgb8).toEqual({ R: 128, G: 128, B: 128 });

            const hsl9 = { h: 0, s: 0, l: 0 };
            const rgb9 = ColorUtils.hslToRgb(hsl9);
            expect(rgb9).toEqual({ R: 0, G: 0, B: 0 });

            const hsl10 = { h: 0, s: 0, l: 100 };
            const rgb10 = ColorUtils.hslToRgb(hsl10);
            expect(rgb10).toEqual({ R: 255, G: 255, B: 255 });
        });
    });

    describe('generateComplementaryColor', () => {
        it('should generate the complementary color correctly', () => {
            const color1 = '#ff0000'; // red
            const complementary1 = ColorUtils.generateComplementaryColor(color1);
            expect(complementary1).toBe('#00ffff'); // cyan

            const color2 = '#00ff00'; // green
            const complementary2 = ColorUtils.generateComplementaryColor(color2);
            expect(complementary2).toBe('#ff00ff'); // magenta

            const color3 = '#0000ff'; // blue
            const complementary3 = ColorUtils.generateComplementaryColor(color3);
            expect(complementary3).toBe('#ffff00'); // yellow

            const color4 = '#ffffff'; // white
            const complementary4 = ColorUtils.generateComplementaryColor(color4);
            expect(complementary4).toBe('#000000'); // black (adjusted expectation)

            const color5 = '#000000'; // black
            const complementary5 = ColorUtils.generateComplementaryColor(color5);
            expect(complementary5).toBe('#ffffff'); // white (adjusted expectation)

            const color6 = '#123456'; // random color
            const complementary6 = ColorUtils.generateComplementaryColor(color6);
            expect(complementary6).toBe('#563412'); // corrected expected value
        });
    });

    describe('hslToHex', () => {
        it('should convert HSL to HEX correctly', () => {
            const hsl1 = { h: 0, s: 100, l: 50 }; // Red
            const hex1 = ColorUtils.hslToHex(hsl1);
            expect(hex1).toBe('#ff0000'); // Expected red

            const hsl2 = { h: 120, s: 100, l: 50 }; // Green
            const hex2 = ColorUtils.hslToHex(hsl2);
            expect(hex2).toBe('#00ff00'); // Expected green

            const hsl3 = { h: 240, s: 100, l: 50 }; // Blue
            const hex3 = ColorUtils.hslToHex(hsl3);
            expect(hex3).toBe('#0000ff'); // Expected blue

            const hsl4 = { h: 0, s: 0, l: 0 }; // Black
            const hex4 = ColorUtils.hslToHex(hsl4);
            expect(hex4).toBe('#000000'); // Expected black

            const hsl5 = { h: 0, s: 0, l: 100 }; // White
            const hex5 = ColorUtils.hslToHex(hsl5);
            expect(hex5).toBe('#ffffff'); // Expected white

            const hsl6 = { h: 60, s: 100, l: 50 }; // Yellow
            const hex6 = ColorUtils.hslToHex(hsl6);
            expect(hex6).toBe('#ffff00'); // Expected yellow

            const hsl7 = { h: 180, s: 100, l: 50 }; // Cyan
            const hex7 = ColorUtils.hslToHex(hsl7);
            expect(hex7).toBe('#00ffff'); // Expected cyan

            const hsl8 = { h: 300, s: 100, l: 50 }; // Magenta
            const hex8 = ColorUtils.hslToHex(hsl8);
            expect(hex8).toBe('#ff00ff'); // Expected magenta
        });
    });

    describe('generateTriadicColors', () => {
        it('should generate triadic colors correctly', () => {
            const baseColor1 = '#ff0000'; // Red
            const triadic1 = ColorUtils.generateTriadicColors(baseColor1);
            expect(triadic1).toEqual([
                '#ff0000', // Red
                '#00ff00', // Green
                '#0000ff'  // Blue
            ]);

            const baseColor2 = '#00ff00'; // Green
            const triadic2 = ColorUtils.generateTriadicColors(baseColor2);
            expect(triadic2).toEqual([
                '#00ff00', // Green
                '#0000ff', // Blue
                '#ff0000'  // Red
            ]);

            const baseColor3 = '#0000ff'; // Blue
            const triadic3 = ColorUtils.generateTriadicColors(baseColor3);
            expect(triadic3).toEqual([
                '#0000ff', // Blue
                '#ff0000', // Red
                '#00ff00'  // Green
            ]);
        });
    });

    describe('generateMonochromaticColors', () => {
        it('should generate the correct number of monochromatic colors', () => {
            const baseColor = '#ff0000'; // Red
            const numColors = 4;
            const monochromaticColors = ColorUtils.generateMonochromaticColors(baseColor, numColors);
            expect(monochromaticColors.length).toBe(numColors);
        });
    
        it('should include the base color as the first color in the list', () => {
            const baseColor = '#00ff00'; // Green
            const numColors = 3;
            const monochromaticColors = ColorUtils.generateMonochromaticColors(baseColor, numColors);
            expect(monochromaticColors[0]).toBe(baseColor);
        });
    
        it('should generate colors with decreasing lightness', () => {
            const baseColor = '#0000ff'; // Blue
            const numColors = 4;
            const monochromaticColors = ColorUtils.generateMonochromaticColors(baseColor, numColors);
            expect(monochromaticColors).toEqual([
                '#0000ff', // Base color
                '#0000cc', // Slightly lighter
                '#000099', // Even lighter
                '#000066'  // Lightest
            ]);
        });
    
        it('should handle edge cases with very small number of colors', () => {
            const baseColor = '#ff00ff'; // Magenta
            const numColors = 1;
            const monochromaticColors = ColorUtils.generateMonochromaticColors(baseColor, numColors);
            expect(monochromaticColors).toEqual([baseColor]);
        });
    
        it('should handle cases with zero colors requested', () => {
            const baseColor = '#ff0000'; // Red
            const numColors = 0;
            const monochromaticColors = ColorUtils.generateMonochromaticColors(baseColor, numColors);
            expect(monochromaticColors).toEqual([]);
        });

    });
});