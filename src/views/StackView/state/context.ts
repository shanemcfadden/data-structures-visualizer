import { createContext, type ActionDispatch } from "react";
import type { StackAction } from "./types";
import { initializeState } from "./util";

export const StackContext = createContext(initializeState());
export const StackDispatchContext = createContext<
  ActionDispatch<[action: StackAction]>
>(() => {});
