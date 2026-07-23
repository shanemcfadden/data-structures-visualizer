import type { Reducer } from "react";
import type { BinarySearchTreeAction, BinarySearchTreeState } from "./types";
import { MAX_BINARY_SEARCH_TREE_SIZE } from "./constants";

export const binarySearchTreeReducer: Reducer<
  BinarySearchTreeState,
  BinarySearchTreeAction
> = (state, action) => {
  const clonedTree = state.tree.clone();
  switch (action.type) {
    case "INSERT":
      if (clonedTree.orderedValues.length < MAX_BINARY_SEARCH_TREE_SIZE) {
        clonedTree.insert(action.value);
      }
      return {
        actionResult: null,
        tree: clonedTree,
      };

    case "DELETE":
      const value = clonedTree.delete(action.value);

      return {
        actionResult: {
          type: "DELETE",
          value,
        },
        tree: clonedTree,
      };
  }
};
