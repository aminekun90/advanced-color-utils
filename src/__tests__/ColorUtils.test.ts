import { ColorUtils } from "@color-utils/ColorUtils";
import { generateRandomColor } from "@color-utils/helper/generateColor";
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