import { Defs } from "../components/Svg/Defs";
import { Arrow } from "../components/Svg/Shapes/Arrow";
import { Circle, type CircleProps } from "../components/Svg/Shapes/Circle";
import { HEIGHT, SvgCanvas, WIDTH } from "../components/Svg/SvgCanvas";
import type { Coordinate } from "../types";

type DataStructureViewerProps = {
  list: number[];
};

export const DataStructureViewer = ({ list }: DataStructureViewerProps) => {
  const PADDING = 50;

  const numberOfCircles = list.length;

  const maxHeightRadius = (HEIGHT - PADDING) / 2;
  const maxWidthRadius =
    (WIDTH - (numberOfCircles + 1) * PADDING) / (2 * numberOfCircles);

  const radius = Math.min(maxHeightRadius, maxWidthRadius);
  const spaceBetweenCircles =
    (WIDTH - numberOfCircles * 2 * radius) / (numberOfCircles + 1);

  const circles = list.map(
    (value, i): CircleProps => ({
      center: [
        (i + 1) * spaceBetweenCircles + (2 * i + 1) * radius,
        HEIGHT / 2,
      ],
      radius,
      text: value.toString(),
    }),
  );

  const CIRCLE_ARROW_PADDING = 5;

  const arrows = circles
    .reduce<{
      previousCircleCenter: Coordinate | null;
      centerPairs: {
        start: Coordinate;
        end: Coordinate;
      }[];
    }>(
      (accumulator, currentCircle) => {
        if (accumulator.previousCircleCenter) {
          accumulator.centerPairs.push({
            start: accumulator.previousCircleCenter,
            end: currentCircle.center,
          });
        }

        accumulator.previousCircleCenter = currentCircle.center;
        return accumulator;
      },
      {
        previousCircleCenter: null,
        centerPairs: [],
      },
    )
    .centerPairs.map(
      ({
        start,
        end,
      }): {
        start: Coordinate;
        end: Coordinate;
      } => ({
        start: [start[0] + radius + CIRCLE_ARROW_PADDING, start[1]],
        end: [end[0] - (radius + CIRCLE_ARROW_PADDING), end[1]],
      }),
    );

  return (
    <SvgCanvas>
      <Defs />

      <rect className="fill-blue-700" width="100%" height="100%" />

      {circles.map((props, i) => (
        <Circle key={i} {...props} />
      ))}

      {arrows.map((props, i) => (
        <Arrow key={i} endPointer {...props} />
      ))}
    </SvgCanvas>
  );
};
