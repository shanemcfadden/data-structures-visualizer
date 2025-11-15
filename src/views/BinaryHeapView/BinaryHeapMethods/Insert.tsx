import { useCallback, useContext } from "react";
import { BinaryHeapDispatchContext } from "../state/context";
import { Action } from "../../../components/Action";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";

export const Insert = () => {
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
      // TODO: add max size constant
      input
      inputMode="numeric"
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      inputPlaceholder={"1"}
      label="Insert"
      onButtonClick={onButtonClick}
    />
  );
};
