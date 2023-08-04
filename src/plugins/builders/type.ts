import { Colors } from "./enum.js";

export type ColorResolve = number | `rgb(${number},${number},${number})` | `hsl(${number},${number},${number})` | keyof typeof Colors | `#${string}`;