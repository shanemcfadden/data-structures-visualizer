import type { PropsWithChildren } from "react";

interface SvgCanvasProps extends PropsWithChildren {
  height: number;
  width: number;
}

export const SvgCanvas = ({ children, height, width }: SvgCanvasProps) => (
  <svg
    version="1.1"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);
