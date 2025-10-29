import { Defs } from "../components/Svg/Defs";
import { Arrow } from "../components/Svg/Shapes/Arrow";
import { Circle, type CircleProps } from "../components/Svg/Shapes/Circle";
import { HEIGHT, SvgCanvas, WIDTH } from "../components/Svg/SvgCanvas";
import type { Coordinate } from "../types";

type DataStructureViewerProps = {
  list: number[];
};

const VIEWPORT_PADDING = 50;
const MAX_RADIUS = 150;
const PROPORTIONAL_SPACE_TO_RADIUS_RATIO = 1.1;
const MAX_SPACE_BETWEEN_CIRCLES = 300;
const SPACE_BETWEEN_CIRCLE_AND_ARROW_TO_CIRCLE_AND_CIRCLE_RATIO = 0.17;

export const DataStructureViewer = ({ list }: DataStructureViewerProps) => {
  const availableWidth = WIDTH - 2 * VIEWPORT_PADDING;

  const numberOfCircles = list.length;

  const radiusProportionalToNumberOfCircles =
    availableWidth /
    (2 * numberOfCircles +
      PROPORTIONAL_SPACE_TO_RADIUS_RATIO * (numberOfCircles - 1));
  const radius = Math.min(MAX_RADIUS, radiusProportionalToNumberOfCircles);

  const spaceBetweenCirclesProportionalToNumberOfCircles =
    PROPORTIONAL_SPACE_TO_RADIUS_RATIO * radiusProportionalToNumberOfCircles;
  const spaceBetweenCircles = Math.min(
    MAX_SPACE_BETWEEN_CIRCLES,
    spaceBetweenCirclesProportionalToNumberOfCircles,
  );

  const startingX = Math.max(
    0,
    (WIDTH -
      (numberOfCircles * 2 * radius +
        (numberOfCircles - 1) * spaceBetweenCircles)) /
      2,
  );

  const circles = list.map(
    (value, i): CircleProps => ({
      center: [
        startingX + (2 * i + 1) * radius + i * spaceBetweenCircles,
        HEIGHT / 2,
      ],
      radius,
      text: value.toString(),
    }),
  );

  const spaceBetweenCirclesAndArrows =
    SPACE_BETWEEN_CIRCLE_AND_ARROW_TO_CIRCLE_AND_CIRCLE_RATIO *
    spaceBetweenCircles;

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
        start: [start[0] + radius + spaceBetweenCirclesAndArrows, start[1]],
        end: [end[0] - (radius + spaceBetweenCirclesAndArrows), end[1]],
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
