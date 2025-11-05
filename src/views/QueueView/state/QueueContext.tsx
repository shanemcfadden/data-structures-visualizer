import { useReducer, type PropsWithChildren } from "react";
import { queueReducer } from "./reducer";
import { initializeState } from "./util";
import { QueueContext, QueueDispatchContext } from "./context";

export const QueueProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    queueReducer,
    undefined,
    initializeState,
  );

  return (
    <QueueContext value={state}>
      <QueueDispatchContext value={dispatch}>{children}</QueueDispatchContext>
    </QueueContext>
  );
};
