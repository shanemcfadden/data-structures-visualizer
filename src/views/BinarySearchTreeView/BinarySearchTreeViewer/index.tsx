import { useContext } from "react";
import { Arrow } from "../../../components/Svg/Shapes/Arrow";
import { BinarySearchTreeContext } from "../state/context";
import {
  BinarySearchNode,
  type IBinarySearchNode,
} from "../../../models/binary-search-tree";
import {
  DataStructureCanvas,
  DATA_STRUCTURE_CANVAS_WIDTH as WIDTH,
  DATA_STRUCTURE_CANVAS_HEIGHT as HEIGHT,
} from "../../../components/DataStructureCanvas";
import { Circle } from "../../../components/Svg/Shapes/Circle";
import type { Coordinate } from "../../../types";
import {
  calculateDistance,
  calculateVectorAngle,
} from "../../../components/Svg/util";

interface TreeMetadata {
  maxDepth: number;
  numberOfMembers: number;
}

interface ValueWithPosition {
  depth: number;
  horizontalIndex: number;
  value: number;
}

const toTreeMetadata = (
  tree: IBinarySearchNode | null,
): {
  metadata: TreeMetadata;
  mappedTree: IBinarySearchNode<ValueWithPosition> | null;
} => {
  const horizontalOffsets = new Set<number>();
  let maxDepth = 0;
  let numberOfMembers = 0;

  const traverseForHorizontalOffsets = (
    node: IBinarySearchNode | null,
    depth: number,
    /* horizontal offset from root node (0)
     * Left edge of screen is -1 and right edge is 1
     * Left child of root is -0.5, its right child is -.25, etc.
     * Used to determine the precise x value for each node when evenly distributing all nodes across the screen
     * */
    horizontalOffset: number,
  ): IBinarySearchNode<{
    depth: number;
    horizontalOffset: number;
    value: number;
  }> | null => {
    if (!node) {
      return null;
    }

    horizontalOffsets.add(horizontalOffset);
    maxDepth = Math.max(maxDepth, depth);
    numberOfMembers++;

    return {
      value: {
        depth,
        horizontalOffset,
        value: node.value,
      },
      left: traverseForHorizontalOffsets(
        node.left,
        depth + 1,
        horizontalOffset - 1 / 2 ** (depth + 1),
      ),
      right: traverseForHorizontalOffsets(
        node.right,
        depth + 1,
        horizontalOffset + 1 / 2 ** (depth + 1),
      ),
    };
  };

  const treeWithHorizontalOffsets = traverseForHorizontalOffsets(tree, 0, 0);

  const horizontalOffsetToHorizontalIndex = Array.from(horizontalOffsets)
    .sort((a, b) => a - b)
    .reduce<Record<number, number>>((map, offset, horizontalIndex) => {
      map[offset] = horizontalIndex;
      return map;
    }, {});

  const toPositionalNodes = (
    node: IBinarySearchNode<{
      depth: number;
      horizontalOffset: number;
      value: number;
    }> | null,
  ): IBinarySearchNode<ValueWithPosition> | null => {
    if (!node) {
      return null;
    }

    return {
      value: {
        depth: node.value.depth,
        horizontalIndex:
          horizontalOffsetToHorizontalIndex[node.value.horizontalOffset],
        value: node.value.value,
      },
      left: toPositionalNodes(node.left),
      right: toPositionalNodes(node.right),
    };
  };

  const positionalTree = toPositionalNodes(treeWithHorizontalOffsets);

  return {
    metadata: {
      maxDepth,
      numberOfMembers,
    },
    mappedTree: positionalTree,
  };
};

const toHorizontalGaps = (numberOfMembers: number) =>
  WIDTH / (numberOfMembers + 1);

const toVerticalGaps = (maxDepth: number) => HEIGHT / (maxDepth + 2);

const toCoordinateTree = (tree: {
  metadata: TreeMetadata;
  mappedTree: IBinarySearchNode<ValueWithPosition> | null;
}): IBinarySearchNode<{
  coordinate: Coordinate;
  radius: number;
  text: string;
}> | null => {
  const horizontalGap = toHorizontalGaps(tree.metadata.numberOfMembers);
  const verticalGap = toVerticalGaps(tree.metadata.maxDepth);

  const proportionalRadius =
    Math.sqrt(horizontalGap ** 2 + verticalGap ** 2) / 4;

  const toCoordinateTreeNode = (
    node: IBinarySearchNode<{
      depth: number;
      horizontalIndex: number;
      value: number;
    }> | null,
  ): IBinarySearchNode<{
    coordinate: Coordinate;
    radius: number;
    text: string;
  }> | null => {
    if (!node) {
      return null;
    }
    const x = (node.value.horizontalIndex + 1) * horizontalGap;
    const y = (node.value.depth + 1) * verticalGap;

    return {
      value: {
        coordinate: [x, y],
        text: node.value.value.toString(),
        radius: proportionalRadius,
      },
      left: toCoordinateTreeNode(node.left),
      right: toCoordinateTreeNode(node.right),
    };
  };

  return toCoordinateTreeNode(tree.mappedTree);
};

const toCoordinates = (
  tree: IBinarySearchNode<{
    coordinate: Coordinate;
    radius: number;
    text: string;
  }> | null,
): { coordinate: Coordinate; radius: number; text: string }[] => {
  if (!tree) {
    return [];
  }

  return BinarySearchNode.foldLeft(
    tree,
    (
      accumulator: { coordinate: Coordinate; radius: number; text: string }[],
      node,
    ) => {
      accumulator.push(node.value);
      return accumulator;
    },
    [],
  );
};

const toArrows = (
  tree: IBinarySearchNode<{
    coordinate: Coordinate;
    radius: number;
    text: string;
  }> | null,
): { start: Coordinate; end: Coordinate }[] => {
  if (!tree) {
    return [];
  }

  return BinarySearchNode.foldLeft<
    {
      coordinate: Coordinate;
      radius: number;
      text: string;
    },
    { start: Coordinate; end: Coordinate }[]
  >(
    tree,
    (arrows, node): { start: Coordinate; end: Coordinate }[] => {
      const spaceFromCenterOfNode = node.value.radius * 1.2;

      if (node.left) {
        const distanceBetweenCoordinates = calculateDistance(
          node.left.value.coordinate,
          node.value.coordinate,
        );

        const lowerAngle = calculateVectorAngle(
          node.value.coordinate,
          node.left.value.coordinate,
        );

        arrows.push({
          start: [
            node.left.value.coordinate[0] -
              Math.cos(lowerAngle) *
                (distanceBetweenCoordinates - spaceFromCenterOfNode),
            node.left.value.coordinate[1] -
              Math.sin(lowerAngle) *
                (distanceBetweenCoordinates - spaceFromCenterOfNode),
          ],
          end: [
            node.left.value.coordinate[0] -
              Math.cos(lowerAngle) * spaceFromCenterOfNode,
            node.left.value.coordinate[1] -
              Math.sin(lowerAngle) * spaceFromCenterOfNode,
          ],
        });
      }
      if (node.right) {
        const distanceBetweenCoordinates = calculateDistance(
          node.value.coordinate,
          node.right.value.coordinate,
        );

        const lowerAngle = calculateVectorAngle(
          node.value.coordinate,
          node.right.value.coordinate,
        );

        arrows.push({
          start: [
            node.right.value.coordinate[0] -
              Math.cos(lowerAngle) *
                (distanceBetweenCoordinates - spaceFromCenterOfNode),
            node.right.value.coordinate[1] -
              Math.sin(lowerAngle) *
                (distanceBetweenCoordinates - spaceFromCenterOfNode),
          ],
          end: [
            node.right.value.coordinate[0] -
              Math.cos(lowerAngle) * spaceFromCenterOfNode,
            node.right.value.coordinate[1] -
              Math.sin(lowerAngle) * spaceFromCenterOfNode,
          ],
        });
      }
      return arrows;
    },
    [],
  );
};

export const BinarySearchTreeViewer = () => {
  const { tree } = useContext(BinarySearchTreeContext);

  const treeWithMetadata = toTreeMetadata(tree.contents);

  const coordinateTree = toCoordinateTree(treeWithMetadata);
  const coordinates = toCoordinates(coordinateTree);
  const arrows = toArrows(coordinateTree);

  const horizontalGap = toHorizontalGaps(
    treeWithMetadata.metadata.numberOfMembers,
  );
  const verticalGap = toVerticalGaps(treeWithMetadata.metadata.maxDepth);

  const proportionalRadius =
    Math.sqrt(horizontalGap ** 2 + verticalGap ** 2) / 4;

  const smallestLength =
    Math.sqrt(horizontalGap ** 2 + verticalGap ** 2) - 2 * proportionalRadius;
  const strokeWidth = Math.sqrt(smallestLength) / 1.3;

  return (
    <DataStructureCanvas>
      {arrows.map((props, i) => (
        <Arrow key={i} {...props} endPointer strokeWidth={strokeWidth} />
      ))}

      {coordinates.map(({ coordinate, radius, text }) => {
        return (
          <Circle
            key={JSON.stringify(coordinate)}
            center={coordinate}
            radius={radius}
            text={text}
          />
        );
      })}
    </DataStructureCanvas>
  );
};
