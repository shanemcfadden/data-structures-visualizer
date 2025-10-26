import { useReducer, type PropsWithChildren } from "react";
import { linkedListReducer } from "./reducer";
import { initializeState } from "./util";
import { LinkedListContext, LinkedListDispatchContext } from "./context";

export const LinkedListProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    linkedListReducer,
    undefined,
    initializeState,
  );

  return (
    <LinkedListContext value={state}>
      <LinkedListDispatchContext value={dispatch}>
        {children}
      </LinkedListDispatchContext>
    </LinkedListContext>
  );
};
