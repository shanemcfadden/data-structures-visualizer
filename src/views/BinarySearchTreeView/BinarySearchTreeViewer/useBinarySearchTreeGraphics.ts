import {
  calculateDefaultStrokeWidth,
  type ArrowProps,
} from "../../../components/Svg/Shapes/Arrow";
import type { CircleProps } from "../../../components/Svg/Shapes/Circle";
import {
  BinarySearchNode,
  type IBinarySearchNode,
} from "../../../models/binary-search-tree/binary-search-node";
import type { TreeWithMetadata } from "./types";
import { useTreeWithMetadata } from "./useTreeWithMetadata";
import {
  DATA_STRUCTURE_CANVAS_WIDTH as WIDTH,
  DATA_STRUCTURE_CANVAS_HEIGHT as HEIGHT,
} from "../../../components/DataStructureCanvas";
import { useMemo } from "react";
import {
  calculateDistance,
  calculateVectorAngle,
} from "../../../components/Svg/util";
import { MAX_RADIUS } from "./constants";

export const useBinarySearchTreeGraphics = (): {
  circles: CircleProps[];
  arrows: ArrowProps[];
} => {
  const treeWithMetadata = useTreeWithMetadata();

  const circlesTree = useMemo(
    () => toCirclesTree(treeWithMetadata),
    [treeWithMetadata],
  );

  const circles = useMemo(() => toCircles(circlesTree), [circlesTree]);
  const arrows = useMemo(() => toArrows(circlesTree), [circlesTree]);

  return { circles, arrows };
};

const calculateNumberOfHorizontalIntervals = (numberOfMembers: number) =>
  WIDTH / (numberOfMembers + 1);

const calculateNumberOfVerticalIntervals = (maxDepth: number) =>
  HEIGHT / (maxDepth + 2);

const toCirclesTree = ({
  metadata,
  tree,
}: TreeWithMetadata): IBinarySearchNode<CircleProps> | null => {
  if (!tree) {
    return null;
  }

  const numberOfHorizontalIntervals = calculateNumberOfHorizontalIntervals(
    metadata.numberOfMembers,
  );
  const numberofVerticalIntervals = calculateNumberOfVerticalIntervals(
    metadata.maxDepth,
  );

  const proportionalRadius =
    Math.sqrt(
      numberOfHorizontalIntervals ** 2 + numberofVerticalIntervals ** 2,
    ) / 4;
  const radius = Math.min(MAX_RADIUS, proportionalRadius);

  return BinarySearchNode.map(tree, (value) => {
    const x = (value.horizontalIndex + 1) * numberOfHorizontalIntervals;
    const y = (value.depth + 1) * numberofVerticalIntervals;

    return {
      center: [x, y],
      radius,
      text: value.value.toString(),
    };
  });
};

const toCircles = (
  tree: IBinarySearchNode<CircleProps> | null,
): CircleProps[] => {
  if (!tree) {
    return [];
  }

  return BinarySearchNode.foldLeft(
    tree,
    (accumulator: CircleProps[], node) => {
      accumulator.push(node.value);
      return accumulator;
    },
    [],
  );
};

const toArrows = (
  tree: IBinarySearchNode<CircleProps> | null,
): ArrowProps[] => {
  if (!tree) {
    return [];
  }

  const endpoints = BinarySearchNode.foldLeft<CircleProps, ArrowEndpoints[]>(
    tree,
    (arrows, node) => {
      if (node.left) {
        arrows.push(toArrowEndpoints(node.value, node.left.value));
      }
      if (node.right) {
        arrows.push(toArrowEndpoints(node.value, node.right.value));
      }

      return arrows;
    },
    [],
  );

  const shortestArrow = Math.min(
    ...endpoints.map(({ start, end }) => calculateDistance(start, end)),
  );
  const strokeWidth = calculateDefaultStrokeWidth(shortestArrow);

  return endpoints.map(({ start, end }) => ({
    start,
    end,
    endPointer: true,
    strokeWidth,
  }));
};

type ArrowEndpoints = Pick<ArrowProps, "start" | "end">;
const toArrowEndpoints = (
  startNodeCircle: CircleProps,
  endNodeCircle: CircleProps,
): Pick<ArrowProps, "start" | "end"> => {
  const arrowAngle = calculateVectorAngle(
    startNodeCircle.center,
    endNodeCircle.center,
  );

  const distanceFromCenterOfStartCircleCenter = startNodeCircle.radius * 1.2;
  const distanceFromCenterOfEndCircleCenter = endNodeCircle.radius * 1.2;

  return {
    start: [
      startNodeCircle.center[0] +
        Math.cos(arrowAngle) * distanceFromCenterOfStartCircleCenter,
      startNodeCircle.center[1] +
        Math.sin(arrowAngle) * distanceFromCenterOfStartCircleCenter,
    ],
    end: [
      endNodeCircle.center[0] -
        Math.cos(arrowAngle) * distanceFromCenterOfEndCircleCenter,
      endNodeCircle.center[1] -
        Math.sin(arrowAngle) * distanceFromCenterOfEndCircleCenter,
    ],
  };
};
