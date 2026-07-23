import { useReducer, type PropsWithChildren } from "react";
import { binarySearchTreeReducer } from "./reducer";
import {
  BinarySearchTreeContext,
  BinarySearchTreeDispatchContext,
} from "./context";
import { initializeState } from "./util";

export const BinarySearchTreeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    binarySearchTreeReducer,
    undefined,
    initializeState,
  );

  return (
    <BinarySearchTreeContext value={state}>
      <BinarySearchTreeDispatchContext value={dispatch}>
        {children}
      </BinarySearchTreeDispatchContext>
    </BinarySearchTreeContext>
  );
};
