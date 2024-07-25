import { ColorUtils } from "../ColorUtils";
import { generateRandomColor } from "../helper/generateColor";
describe("getDistinctColors",()=>{
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
        const colors:Array<string> = [];
        const numberOfColors = 2;
        const threshold = 2;
    
        const filteredColors = ColorUtils.getDistinctColors(colors, numberOfColors, threshold);
        expect(filteredColors).toStrictEqual([]);
    });
    it("should return empty array numberOfColors is 0", () => {
        const colors:Array<string> =  ["#ff0000", "#ff0001", "#ff0002", "#00ff00", "#0000ff"];
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