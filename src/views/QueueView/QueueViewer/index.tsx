import { useContext } from "react";
import { QueueContext } from "../state/context";
import {
  DATA_STRUCTURE_CANVAS_HEIGHT,
  DataStructureCanvas,
} from "../../../components/DataStructureCanvas";
import { Rectangle } from "../../../components/Svg/Shapes/Rectangle";
import {
  ELEMENT_HEIGHT,
  ELEMENT_WIDTH,
  PADDING,
  SIDE_PADDING,
} from "./constants";

export const QueueViewer = () => {
  const queue = useContext(QueueContext);

  return (
    <DataStructureCanvas>
      {queue.members.map((value, i) => (
        <Rectangle
          key={i}
          height={ELEMENT_HEIGHT}
          origin={[
            SIDE_PADDING + (ELEMENT_WIDTH + PADDING) * i,
            (DATA_STRUCTURE_CANVAS_HEIGHT - ELEMENT_HEIGHT) / 2,
          ]}
          text={value.toString()}
          width={ELEMENT_WIDTH}
        />
      ))}
    </DataStructureCanvas>
  );
};
