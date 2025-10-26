import { useCallback, useContext } from "react";
import { Action } from "../../../components/Action";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";
import { LinkedListDispatchContext } from "../state/context";

export const Prepend = () => {
  const dispatch = useContext(LinkedListDispatchContext);

  const onButtonClick = useCallback(
    (input?: string) => {
      if (!input || isNaN(+input)) {
        return;
      }

      dispatch({
        type: "PREPEND",
        value: +input,
      });
    },
    [dispatch],
  );

  return (
    <Action
      input
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      inputPlaceholder={"42"}
      label="Prepend"
      onButtonClick={onButtonClick}
    />
  );
};
