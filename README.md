# Advanced ColorUtils Library

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/aminekun90/color-utils/graphs/commit-activity) [![version number](https://img.shields.io/npm/v/mdns-listener-advanced?color=green&label=version)](https://github.com/aminekun90/color-utils/releases) [![Actions Status](https://github.com/aminekun90/color-utils/workflows/Test/badge.svg)](https://github.com/aminekun90/color-utils/actions) [![License](https://img.shields.io/github/license/aminekun90/color-utils)](https://github.com/aminekun90/color-utils/blob/master/LICENSE)
![node-current](https://img.shields.io/node/v/mdns-listener-advanced)
[![Socket Badge](https://socket.dev/api/badge/npm/package/mdns-listener-advanced)](https://socket.dev/npm/package/mdns-listener-advanced)

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
npm install color-utils
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

Parameters:

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