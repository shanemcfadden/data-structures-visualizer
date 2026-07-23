import {
  Arrow,
  calculateDefaultStrokeWidth,
} from "../../../components/Svg/Shapes/Arrow";
import { DataStructureCanvas } from "../../../components/DataStructureCanvas";
import { Circle } from "../../../components/Svg/Shapes/Circle";
import { calculateDistance } from "../../../components/Svg/util";
import { useBinarySearchTreeGraphics } from "./useBinarySearchTreeGraphics";

export const BinarySearchTreeViewer = () => {
  const { arrows, circles } = useBinarySearchTreeGraphics();

  const smallestLength = Math.min(
    ...arrows.map(({ start, end }) => calculateDistance(start, end)),
  );
  const strokeWidth = calculateDefaultStrokeWidth(smallestLength);

  return (
    <DataStructureCanvas>
      {arrows.map((props, i) => (
        <Arrow key={i} {...props} endPointer strokeWidth={strokeWidth} />
      ))}

      {circles.map(({ center, radius, text }) => {
        return (
          <Circle
            key={JSON.stringify(center)}
            center={center}
            radius={radius}
            text={text}
          />
        );
      })}
    </DataStructureCanvas>
  );
};
