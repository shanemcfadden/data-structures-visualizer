import { BinarySearchTree } from "../../../models/binary-search-tree";
import type { BinarySearchTreeState } from "./types";

export const initializeState = (): BinarySearchTreeState => ({
  actionResult: null,
  tree: new BinarySearchTree(),
});
