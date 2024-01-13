import { schemeBlues, schemeOranges } from "d3-scale-chromatic";
export const colorSchemes = [
  schemeBlues[9].slice(1, 7).reverse(),
  schemeOranges[9].slice(0, 6).reverse(),
  ["#2f3c68", "#4f5983", "#565e84", "#6e77a0", "#8e98c6", "#a6aecf"],
  ["#79AC78", "#B0D9B1", "#D0E7D2", "#8e98c6", "#a6aecf"],
  ["#4b7a6c", "#639082", "#7ba799", "#93bfb0", "#abd7c8", "#c7efe2"],
  ["#c93c40", "#d25e62", "#e8767a", "#d26266", "#fe8a8e", "#ef9396"],
  ["#953768", "#af5481", "#cb709b", "#e88cb7", "#ffadd1", "#ffd7e7"],
  ["#4a166a", "#602a81", "#633f81", "#8262a0", "#b095c6", "#d9c0ee"],
];
