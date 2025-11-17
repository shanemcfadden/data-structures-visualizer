import type { Reducer } from "react";
import type { BinaryHeapAction, BinaryHeapState } from "./types";
import { MAX_BINARY_HEAP_SIZE } from "./constants";

export const binaryHeapReducer: Reducer<BinaryHeapState, BinaryHeapAction> = (
  state,
  action,
) => {
  const clonedHeap = state.heap.clone();

  switch (action.type) {
    case "INSERT":
      if (clonedHeap.size < MAX_BINARY_HEAP_SIZE) {
        clonedHeap.insert(action.value);
      }

      return {
        actionResult: null,
        heap: clonedHeap,
      };
    case "EXTRACT":
      const result = clonedHeap.extract();
      return {
        actionResult: {
          type: "EXTRACT",
          value: result,
        },
        heap: clonedHeap,
      };
  }
};
