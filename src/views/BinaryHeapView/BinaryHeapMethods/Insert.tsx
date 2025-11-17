import { useCallback, useContext } from "react";
import { BinaryHeapContext, BinaryHeapDispatchContext } from "../state/context";
import { Action } from "../../../components/Action";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";
import { MAX_BINARY_HEAP_SIZE } from "../state/constants";

export const Insert = () => {
  const { heap } = useContext(BinaryHeapContext);
  const dispatch = useContext(BinaryHeapDispatchContext);

  const onButtonClick = useCallback(
    (input?: string) => {
      if (!input || isNaN(+input)) {
        return;
      }

      dispatch({
        type: "INSERT",
        value: +input,
      });
    },
    [dispatch],
  );

  return (
    <Action
      disabled={heap.size >= MAX_BINARY_HEAP_SIZE}
      input
      inputMode="numeric"
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      inputPlaceholder={"1"}
      label="Insert"
      onButtonClick={onButtonClick}
    />
  );
};
