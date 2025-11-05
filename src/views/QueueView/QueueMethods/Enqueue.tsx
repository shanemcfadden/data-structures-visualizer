import { useCallback, useContext } from "react";
import { QueueContext, QueueDispatchContext } from "../state/context";
import { Action } from "../../../components/Action";
import { MAX_QUEUE_SIZE } from "../state/constants";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";

export const Enqueue = () => {
  const queue = useContext(QueueContext);
  const dispatch = useContext(QueueDispatchContext);

  const onButtonClick = useCallback(
    (input?: string) => {
      if (!input || isNaN(+input)) {
        return;
      }

      dispatch({
        type: "ENQUEUE",
        value: +input,
      });
    },
    [dispatch],
  );

  return (
    <Action
      disabled={queue.members.length >= MAX_QUEUE_SIZE}
      input
      inputMode="numeric"
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      inputPlaceholder={"1"}
      label="Enqueue"
      onButtonClick={onButtonClick}
    />
  );
};
