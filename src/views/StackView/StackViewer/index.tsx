import { useContext } from "react";
import { StackContext } from "../state/context";
import {
  DATA_STRUCTURE_CANVAS_HEIGHT,
  DATA_STRUCTURE_CANVAS_WIDTH,
  DataStructureCanvas,
} from "../../../components/DataStructureCanvas";
import { Rectangle } from "../../../components/Svg/Shapes/Rectangle";
import {
  BOTTOM_PADDING,
  ELEMENT_HEIGHT,
  ELEMENT_WIDTH,
  PADDING,
} from "./constants";

export const StackViewer = () => {
  const stack = useContext(StackContext);

  return (
    <DataStructureCanvas>
      {stack.members.map((value, i) => (
        <Rectangle
          key={i}
          height={ELEMENT_HEIGHT}
          origin={[
            (DATA_STRUCTURE_CANVAS_WIDTH - ELEMENT_WIDTH) / 2,
            DATA_STRUCTURE_CANVAS_HEIGHT -
              BOTTOM_PADDING -
              i * PADDING -
              (i + 1) * ELEMENT_HEIGHT,
          ]}
          text={value.toString()}
          width={ELEMENT_WIDTH}
        />
      ))}
    </DataStructureCanvas>
  );
};
