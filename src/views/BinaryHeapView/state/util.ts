import { MinHeap } from "../../../models/heap";
import type { BinaryHeapState } from "./types";

export const initializeState = (): BinaryHeapState => ({
  actionResult: null,
  heap: new MinHeap(),
});
