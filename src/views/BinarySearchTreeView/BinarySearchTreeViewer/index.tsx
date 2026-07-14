import { useContext } from "react";
// import { Arrow, type ArrowProps } from "../../../components/Svg/Shapes/Arrow";
// import {
//   Circle,
//   type CircleProps,
// } from "../../../components/Svg/Shapes/Circle";
import { BinarySearchTreeContext } from "../state/context";
import type { IBinarySearchNode } from "../../../models/binary-search-tree";
import {
  DataStructureCanvas,
  DATA_STRUCTURE_CANVAS_WIDTH as WIDTH,
  DATA_STRUCTURE_CANVAS_HEIGHT as HEIGHT,
} from "../../../components/DataStructureCanvas";
import { MAX_RADIUS } from "./constants";
import { Circle } from "../../../components/Svg/Shapes/Circle";
import type { Coordinate } from "../../../types";
//
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

const toCoordinates = (tree: {
  metadata: TreeMetadata;
  mappedTree: IBinarySearchNode<ValueWithPosition> | null;
}): { coordinate: Coordinate; text: string }[] => {
  const coordinates: { coordinate: Coordinate; text: string }[] = [];

  const traverse = (
    node: IBinarySearchNode<{
      depth: number;
      horizontalIndex: number;
      value: number;
    }> | null,
  ): void => {
    if (!node) {
      return;
    }

    const x =
      WIDTH *
      ((node.value.horizontalIndex + 1) / (tree.metadata.numberOfMembers + 1));
    const y = HEIGHT * ((node.value.depth + 1) / (tree.metadata.maxDepth + 2));

    coordinates.push({ coordinate: [x, y], text: node.value.value.toString() });

    traverse(node.left);
    traverse(node.right);
  };

  traverse(tree.mappedTree);

  return coordinates;
};

export const BinarySearchTreeViewer = () => {
  const { tree } = useContext(BinarySearchTreeContext);

  const treeWithMetadata = toTreeMetadata(tree.contents);

  const coordinates = toCoordinates(treeWithMetadata);

  // const { heap } = useContext(BinarySearchTreeContext);
  //
  // const maxLongestHeapRow = 2 ** (heap.members.length - 1);
  // const proportionalRadius = (WIDTH / (2 * maxLongestHeapRow)) * 0.8;
  //
  // const radius = Math.min(proportionalRadius, MAX_RADIUS);
  //
  // const verticalUnit = HEIGHT / (heap.members.length + 1);
  // const horizontalUnitFromCenter = Math.min(
  //   WIDTH / (2 * maxLongestHeapRow),
  //   verticalUnit / Math.tan(Math.PI / 3),
  // );
  //
  // const circleHeap: CircleProps[][] = heap.members.map((row, i) =>
  //   row.map((value, j) => ({
  //     center: [
  //       WIDTH / 2 +
  //         ((1 + 2 * j - 2 ** i) / 2 ** i) *
  //           horizontalUnitFromCenter *
  //           maxLongestHeapRow,
  //       (i + 1) * verticalUnit,
  //     ],
  //     radius,
  //     text: value.toString(),
  //   })),
  // );
  //
  // const arrows: ArrowProps[] = circleHeap.reduce<ArrowProps[]>(
  //   (accumulator, circleRow, i) => {
  //     if (i === 0) {
  //       return accumulator;
  //     }
  //
  //     circleRow.forEach((childCircle, j) => {
  //       const parentCircle = circleHeap[i - 1][Math.floor(j / 2)];
  //       accumulator.push({
  //         start: parentCircle.center,
  //         end: childCircle.center,
  //         strokeWidth: 8,
  //       });
  //     });
  //
  //     return accumulator;
  //   },
  //   [],
  // );
  return (
    <DataStructureCanvas>
      {/* {arrows.map((props, i) => ( */}
      {/*   <Arrow key={i} {...props} /> */}
      {/* ))} */}

      {coordinates.map(({ coordinate, text }) => {
        const radius = MAX_RADIUS;
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
