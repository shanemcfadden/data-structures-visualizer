import type { IBinarySearchNode } from "../../../models/binary-search-tree";

export interface TreeWithMetadata {
  metadata: TreeMetadata;
  tree: IBinarySearchNode<ValueWithPosition> | null;
}

interface TreeMetadata {
  maxDepth: number;
  numberOfMembers: number;
}

interface ValueWithPosition {
  depth: number;
  horizontalIndex: number;
  value: number;
}
