import { useContext } from "react";
import { Arrow } from "../../../components/Svg/Shapes/Arrow";
import {
  Circle,
  type CircleProps,
} from "../../../components/Svg/Shapes/Circle";
import type { Coordinate } from "../../../types";
import {
  MAX_RADIUS,
  MAX_SPACE_BETWEEN_CIRCLES,
  PROPORTIONAL_SPACE_TO_RADIUS_RATIO,
  SPACE_BETWEEN_CIRCLE_AND_ARROW_TO_CIRCLE_AND_CIRCLE_RATIO,
  VIEWPORT_PADDING,
} from "./constants";
import { LinkedListContext } from "../state/context";
import {
  DataStructureCanvas,
  DATA_STRUCTURE_CANVAS_WIDTH as WIDTH,
  DATA_STRUCTURE_CANVAS_HEIGHT as HEIGHT,
} from "../../../components/DataStructureCanvas";

export const LinkedListViewer = () => {
  const { list } = useContext(LinkedListContext);

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
    <DataStructureCanvas>
      {circles.map((props, i) => (
        <Circle key={i} {...props} />
      ))}

      {arrows.map((props, i) => (
        <Arrow key={i} endPointer {...props} />
      ))}
    </DataStructureCanvas>
  );
};
