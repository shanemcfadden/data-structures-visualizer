import type { PropsWithChildren } from "react";

export const HEIGHT = 320;
export const WIDTH = 640;

export const SvgCanvas = ({ children }: PropsWithChildren) => (
  <svg
    version="1.1"
    width={WIDTH}
    height={HEIGHT}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);
