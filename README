# ColorUtils Library

A TypeScript library for working with colors, providing functionality to find distinct colors from a list based on a similarity threshold.

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