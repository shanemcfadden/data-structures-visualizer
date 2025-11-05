import { Stack } from "../../../models/stack";
import type { StackActionResult, StackState } from "./types";

export const stackToState = (
  stack: Stack<number>,
  actionResult: StackActionResult | null = null,
): StackState => ({
  actionResult,
  members: [...stack],
});

export const initializeState = () => stackToState(new Stack());
