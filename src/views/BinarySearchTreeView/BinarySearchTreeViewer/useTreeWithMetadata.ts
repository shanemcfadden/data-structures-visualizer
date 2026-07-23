import { useContext, useMemo } from "react";
import {
  BinarySearchNode,
  type IBinarySearchNode,
} from "../../../models/binary-search-tree/binary-search-node";
import { BinarySearchTreeContext } from "../state/context";
import type { TreeWithMetadata } from "./types";

export const useTreeWithMetadata = (): TreeWithMetadata => {
  const { tree } = useContext(BinarySearchTreeContext);

  return useMemo(() => {
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

    const treeWithHorizontalOffsets = traverseForHorizontalOffsets(
      tree.contents,
      0,
      0,
    );

    const horizontalOffsetToHorizontalIndex = Array.from(horizontalOffsets)
      .sort((a, b) => a - b)
      .reduce<Record<number, number>>((map, offset, horizontalIndex) => {
        map[offset] = horizontalIndex;
        return map;
      }, {});

    const positionalTree = treeWithHorizontalOffsets
      ? BinarySearchNode.map(treeWithHorizontalOffsets, (value) => ({
          depth: value.depth,
          horizontalIndex:
            horizontalOffsetToHorizontalIndex[value.horizontalOffset],
          value: value.value,
        }))
      : null;

    return {
      metadata: {
        maxDepth,
        numberOfMembers,
      },
      tree: positionalTree,
    };
  }, [tree]);
};
