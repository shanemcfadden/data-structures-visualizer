import { useContext } from "react";
import { Arrow, type ArrowProps } from "../../../components/Svg/Shapes/Arrow";
import {
  Circle,
  type CircleProps,
} from "../../../components/Svg/Shapes/Circle";
import { BinaryHeapContext } from "../state/context";
import {
  DataStructureCanvas,
  DATA_STRUCTURE_CANVAS_WIDTH as WIDTH,
  DATA_STRUCTURE_CANVAS_HEIGHT as HEIGHT,
} from "../../../components/DataStructureCanvas";
import { MAX_RADIUS } from "./constants";

export const BinaryHeapViewer = () => {
  const { heap } = useContext(BinaryHeapContext);

  const maxLongestHeapRow = 2 ** (heap.members.length - 1);
  const proportionalRadius = (WIDTH / (2 * maxLongestHeapRow)) * 0.8;

  const radius = Math.min(proportionalRadius, MAX_RADIUS);

  const circleHeap: CircleProps[][] = heap.members.map((row, i) =>
    row.map((value, j) => {
      return {
        center: [
          WIDTH * ((2 * j + 1) / 2 ** (i + 1)),
          HEIGHT * ((i + 1) / (heap.members.length + 1)),
        ],
        radius: radius,
        text: value.toString(),
      };
    }),
  );

  const arrows: ArrowProps[] = circleHeap.reduce<ArrowProps[]>(
    (accumulator, circleRow, i) => {
      if (i === 0) {
        return accumulator;
      }

      circleRow.forEach((childCircle, j) => {
        const parentCircle = circleHeap[i - 1][Math.floor(j / 2)];
        accumulator.push({
          start: parentCircle.center,
          end: childCircle.center,
          strokeWidth: 8,
        });
      });

      return accumulator;
    },
    [],
  );

  return (
    <DataStructureCanvas>
      {arrows.map((props, i) => (
        <Arrow key={i} {...props} />
      ))}

      {circleHeap.flat().map((props) => (
        <Circle key={JSON.stringify(props.center)} {...props} />
      ))}
    </DataStructureCanvas>
  );
};
