# Advanced ColorUtils Library

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/aminekun90/advanced-color-utils/graphs/commit-activity) [![version number](https://img.shields.io/npm/v/advanced-color-utils?color=green&label=version)](https://github.com/aminekun90/advanced-color-utils/releases) [![Actions Status](https://github.com/aminekun90/advanced-color-utils/workflows/Test/badge.svg)](https://github.com/aminekun90/advanced-color-utils/actions) [![License](https://img.shields.io/github/license/aminekun90/color-utils)](https://github.com/aminekun90/advanced-color-utils/blob/master/LICENSE)
![node-current](https://img.shields.io/node/v/advanced-color-utils)
[![Socket Badge](https://socket.dev/api/badge/npm/package/advanced-color-utils)](https://socket.dev/npm/package/advanced-color-utils)

A TypeScript library for working with colors, providing functionality to find distinct colors from a list based on a similarity threshold.

## Description

Unleash the full potential of color manipulation with the ColorUtils library! Designed for developers who need precise control over color processing, this TypeScript library provides powerful tools to efficiently find and manipulate distinct colors from any color palette. Whether you're working on data visualization, graphic design, or user interface development, ColorUtils ensures your colors are perfectly balanced and aesthetically pleasing.

## Key Features:
- Precision Color Conversion: Seamlessly convert between HEX and LAB color spaces to ensure accurate color representation and manipulation.
- Distinct Color Extraction: Effortlessly extract a specified number of distinct colors from any list, using customizable similarity thresholds to ensure the perfect balance.
- Performance Optimization: Optimized for both memory and time efficiency, making it suitable for handling large datasets with millions of colors.
- TypeScript Support: Fully typed for enhanced developer experience and robust error checking.
## Why Choose ColorUtils?
- High Efficiency: Designed to handle massive color datasets with ease, providing rapid results even with millions of colors.
- Customizability: Fine-tune color similarity thresholds to match your specific needs and achieve the perfect color harmony.
- Reliability: Built with rigorous testing and performance benchmarks to ensure consistent and reliable results.
- Ease of Use: Intuitive API design, comprehensive documentation, and seamless integration into any TypeScript project.
- Elevate your projects with the precision and performance of the ColorUtils library, your ultimate tool for advanced color processing and manipulation.
- 
## Installation

Install the library using npm:

```sh
npm install advanced-color-utils
```
## Usage
### Importing the Library

You can import the ColorUtils class from the library as follows:

 ```typescript
 import { ColorUtils } from '@color-utils/ColorUtils';
 ```

### Methods
`getDistinctColors`

Finds a specified number of distinct colors from a list based on a similarity threshold.

**Parameters:**

`hexColors` (string[]): The list of hex color strings (e.g., `['#ff0000', '#00ff00']`).
`numColors` (number): The number of distinct colors to retrieve.
`threshold` (number): The threshold for color similarity (lower values mean more similar).
Returns:

(string[]): The list of distinct hex color strings.
Example:

```typescript
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff'];
const numColorsToRetrieve = 2;
const threshold = 20;

const distinctColors = ColorUtils.getDistinctColors(colors, numColorsToRetrieve, threshold);
console.log(distinctColors); // Output: ['#ff0000', '#00ff00']
```
`labToHex`

Converts a LAB color to a hex color string.

**Parameters:**

`lab` (LabColor): The LAB color object.

**Returns:**

(string): The hex color string.

**Example:**

```typescript
const lab = { L: 53.23288, a: 80.10933, b: 67.22006 };
const hex = ColorUtils.labToHex(lab);
console.log(hex); // Output: '#ff0000'
```

`hexToLab`

Converts a hex color to a LAB color object.

**Parameters:**

`hex` (string): The hex color string (e.g., '#ff0000').

**Returns:**

(LabColor): The LAB color object.

**Example:**

```typescript
const hex = '#ff0000';
const lab = ColorUtils.hexToLab(hex);
console.log(lab); // Output: { L: 53.23288, a: 80.10933, b: 67.22006 }
```

`rgbToHex`

Converts an RGB color to a hex color string.

**Parameters:**

`rgb` (RGBColor): The RGB color object.

**Returns:**

(string): The hex color string.

**Example:**

```typescript
const rgb = { R: 255, G: 0, B: 0 };
const hex = ColorUtils.rgbToHex(rgb);
console.log(hex); // Output: '#ff0000'
```

`hexToRgb`

Converts a hex color to an RGB color object.

**Parameters:**

`hex` (string): The hex color string (e.g., '#ff0000').

**Returns:**

(RGBColor): The RGB color object.
**Example:**

```typescript
const hex = '#ff0000';
const rgb = ColorUtils.hexToRgb(hex);
console.log(rgb); // Output: { R: 255, G: 0, B: 0 }
```

`generateColorPalette`

Generates a color palette based on a given hex color and the desired number of colors.

**Parameters:**

`hex` (string): The hex color string (e.g., '#ff0000').
numColors (number): The number of colors in the palette.

**Returns:**

(string[]): The array of hex color strings in the palette.

**Example:**

```typescript
const palette = ColorUtils.generateColorPalette('#ff0000', 5);
console.log(palette); // Output: ['#ff0000', '#ff3333', '#ff6666', '#ff9999', '#ffcccc']
```

`getComplementaryColor`

Generates a complementary color for a given hex color.

**Parameters:**

`hex` (string): The hex color string (e.g., '#ff0000').

**Returns:**

(string): The complementary hex color string.

**Example:**

```typescript
const complementaryColor = ColorUtils.getComplementaryColor('#ff0000');
console.log(complementaryColor); // Output: '#00ffff'
```
