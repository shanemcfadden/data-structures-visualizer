import type { Reducer } from "react";
import type { BinaryHeapAction, BinaryHeapState } from "./types";

export const binaryHeapReducer: Reducer<BinaryHeapState, BinaryHeapAction> = (
  state,
  action,
) => {
  const clonedHeap = state.heap.clone();

  switch (action.type) {
    case "INSERT":
      clonedHeap.insert(action.value);
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
