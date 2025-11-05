import { useCallback, useContext } from "react";
import { Action } from "../../../components/Action";
import { QueueContext, QueueDispatchContext } from "../state/context";

export const Dequeue = () => {
  const queue = useContext(QueueContext);
  const dispatch = useContext(QueueDispatchContext);

  const onButtonClick = useCallback(
    () =>
      dispatch({
        type: "DEQUEUE",
      }),
    [dispatch],
  );

  return (
    <Action
      disabled={queue.members.length === 0}
      label="Dequeue"
      onButtonClick={onButtonClick}
    />
  );
};
