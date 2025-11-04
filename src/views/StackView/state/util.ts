import { Stack } from "../../../models/stack";
import type { StackState } from "./types";

export const stackToState = (stack: Stack<number>): StackState => ({
  members: [...stack],
});

export const initializeState = () => stackToState(new Stack());
