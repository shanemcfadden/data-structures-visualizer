import type { PropsWithChildren } from "react";

export const HEIGHT = 900;
export const WIDTH = 1600;

export const SvgCanvas = ({ children }: PropsWithChildren) => (
  <svg
    version="1.1"
    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);
