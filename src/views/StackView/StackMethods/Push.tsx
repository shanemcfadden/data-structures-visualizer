import { useCallback, useContext } from "react";
import { StackContext, StackDispatchContext } from "../state/context";
import { Action } from "../../../components/Action";
import { MAX_STACK_SIZE } from "../state/constants";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";

export const Push = () => {
  const stack = useContext(StackContext);
  const dispatch = useContext(StackDispatchContext);

  const onButtonClick = useCallback(
    (input?: string) => {
      if (!input || isNaN(+input)) {
        return;
      }

      dispatch({
        type: "PUSH",
        value: +input,
      });
    },
    [dispatch],
  );

  return (
    <Action
      disabled={stack.members.length >= MAX_STACK_SIZE}
      input
      inputMode="numeric"
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      inputPlaceholder={"1"}
      label="Push"
      onButtonClick={onButtonClick}
    />
  );
};
