import { useCallback, useContext, useMemo } from "react";
import { Action } from "../../../components/Action";
import { QueueContext, QueueDispatchContext } from "../state/context";
import { nullableNumberToString } from "../../../util";

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

  const result = useMemo(() => {
    if (queue.actionResult?.type === "DEQUEUE") {
      return nullableNumberToString(queue.actionResult.value);
    }
  }, [queue]);

  return (
    <Action
      data-cy="queue-method-dequeue"
      disabled={queue.members.length === 0}
      label="Dequeue"
      onButtonClick={onButtonClick}
      result={result}
      resultLabel="Dequeued"
    />
  );
};
