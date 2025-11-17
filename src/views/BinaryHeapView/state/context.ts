import { createContext, type ActionDispatch } from "react";
import type { BinaryHeapAction } from "./types";
import { initializeState } from "./util";

export const BinaryHeapContext = createContext(initializeState());
export const BinaryHeapDispatchContext = createContext<
  ActionDispatch<[action: BinaryHeapAction]>
>(() => {});
