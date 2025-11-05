import { createContext, type ActionDispatch } from "react";
import type { QueueAction } from "./types";
import { initializeState } from "./util";

export const QueueContext = createContext(initializeState());
export const QueueDispatchContext = createContext<
  ActionDispatch<[action: QueueAction]>
>(() => {});
