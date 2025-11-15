import { useReducer, type PropsWithChildren } from "react";
import { binaryHeapReducer } from "./reducer";
import { BinaryHeapContext, BinaryHeapDispatchContext } from "./context";
import { initializeState } from "./util";

export const BinaryHeapProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    binaryHeapReducer,
    undefined,
    initializeState,
  );

  return (
    <BinaryHeapContext value={state}>
      <BinaryHeapDispatchContext value={dispatch}>
        {children}
      </BinaryHeapDispatchContext>
    </BinaryHeapContext>
  );
};
