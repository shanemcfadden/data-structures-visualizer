import { Arrow } from "../../../components/Svg/Shapes/Arrow";
import { DataStructureCanvas } from "../../../components/DataStructureCanvas";
import { Circle } from "../../../components/Svg/Shapes/Circle";
import { useBinarySearchTreeGraphics } from "./useBinarySearchTreeGraphics";

export const BinarySearchTreeViewer = () => {
  const { arrows, circles } = useBinarySearchTreeGraphics();

  return (
    <DataStructureCanvas>
      {arrows.map((props, i) => (
        <Arrow key={i} {...props} />
      ))}

      {circles.map(({ ...props }) => <Circle key={JSON.stringify(props.center)} {...props} />)}
    </DataStructureCanvas>
  );
};
