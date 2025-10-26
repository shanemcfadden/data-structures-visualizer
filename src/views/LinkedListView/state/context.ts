import { createContext, type ActionDispatch } from "react";
import type { LinkedListAction } from "./types";
import { initializeState } from "./util";

export const LinkedListContext = createContext(initializeState());
export const LinkedListDispatchContext = createContext<
  ActionDispatch<[action: LinkedListAction]>
>(() => {});
