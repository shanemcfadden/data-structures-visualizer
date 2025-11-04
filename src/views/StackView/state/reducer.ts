import type { Reducer } from "react";
import { Stack } from "../../../models/stack";
import type { StackAction, StackState } from "./types";
import { stackToState } from "./util";
import { MAX_STACK_SIZE } from "./constants";

export const stackReducer: Reducer<StackState, StackAction> = (
  state,
  action,
) => {
  const stack = new Stack(state.members);
  switch (action.type) {
    case "PUSH":
      if (stack.size >= MAX_STACK_SIZE) {
        break;
      }
      stack.push(action.value);
      break;
    case "POP":
      stack.pop();
      break;
  }
  return stackToState(stack);
};
