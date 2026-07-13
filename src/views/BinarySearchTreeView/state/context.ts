import { createContext, type ActionDispatch } from "react";
import type { BinarySearchTreeAction } from "./types";
import { initializeState } from "./util";

export const BinarySearchTreeContext = createContext(initializeState());
export const BinarySearchTreeDispatchContext = createContext<
  ActionDispatch<[action: BinarySearchTreeAction]>
>(() => {});
