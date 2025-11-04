import { useContext } from "react";
import { StackContext } from "../state/context";
import {
  DATA_STRUCTURE_CANVAS_HEIGHT,
  DataStructureCanvas,
} from "../../../components/DataStructureCanvas";
import { Rectangle } from "../../../components/Svg/Shapes/Rectangle";

const PADDING = 10;
const ELEMENT_HEIGHT = 80;

export const StackViewer = () => {
  const stack = useContext(StackContext);

  return (
    <DataStructureCanvas>
      {stack.members.map((value, i) => (
        <Rectangle
          key={i}
          origin={[
            500,
            DATA_STRUCTURE_CANVAS_HEIGHT -
              i * PADDING -
              (i + 1) * ELEMENT_HEIGHT,
          ]}
          width={600}
          height={ELEMENT_HEIGHT}
          text={value.toString()}
        />
      ))}
    </DataStructureCanvas>
  );
};
