import type { BinarySearchTree } from "../../../models/binary-search-tree";

export type BinarySearchTreeState = {
  actionResult: BinarySearchTreeActionResult | null;
  tree: BinarySearchTree;
};

export type BinarySearchTreeAction =
  | {
      type: "INSERT";
      value: number;
    }
  | {
      type: "DELETE";
      value: number;
    };

export type BinarySearchTreeActionResult = {
  type: "DELETE";
  value: boolean;
};
