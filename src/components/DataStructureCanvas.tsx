import type { PropsWithChildren } from "react";
import { SvgCanvas } from "./Svg/SvgCanvas";
import { Defs } from "./Svg/Defs";

export const DATA_STRUCTURE_CANVAS_HEIGHT = 900;
export const DATA_STRUCTURE_CANVAS_WIDTH = 1600;

export const DataStructureCanvas = ({ children }: PropsWithChildren) => (
  <SvgCanvas
    height={DATA_STRUCTURE_CANVAS_HEIGHT}
    width={DATA_STRUCTURE_CANVAS_WIDTH}
  >
    <Defs />
    <rect className="fill-blue-700" width="100%" height="100%" />
    {children}
  </SvgCanvas>
);
