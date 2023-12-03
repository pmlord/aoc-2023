export const Colors = ["red", "green", "blue"] as const;

export type Color = (typeof Colors)[number];

export function isColor(input: string): input is Color {
  return Colors.some((color) => input === color);
}

export type Draw = Record<Color, number>;

export type GameStruct = {
  id: number;
  draws: Draw[];
};
