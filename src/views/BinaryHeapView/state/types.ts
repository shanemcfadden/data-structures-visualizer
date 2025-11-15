import type { MinHeap } from "../../../models/heap";

export type BinaryHeapState = {
  actionResult: BinaryHeapActionResult | null;
  heap: MinHeap;
};

export type BinaryHeapAction =
  | {
      type: "INSERT";
      value: number;
    }
  | {
      type: "EXTRACT";
    };

export type BinaryHeapActionResult = {
  type: "EXTRACT";
  value: number | null;
};
