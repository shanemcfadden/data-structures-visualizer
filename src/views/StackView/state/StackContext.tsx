import { useReducer, type PropsWithChildren } from "react";
import { stackReducer } from "./reducer";
import { initializeState } from "./util";
import { StackContext, StackDispatchContext } from "./context";

export const StackProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    stackReducer,
    undefined,
    initializeState,
  );

  return (
    <StackContext value={state}>
      <StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
    </StackContext>
  );
};
