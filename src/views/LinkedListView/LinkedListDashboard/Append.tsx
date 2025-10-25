import { useCallback, useContext } from "react";
import { LinkedListDispatchContext } from "../state/LinkedListContext";
import { Action } from "../../../components/Action";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";

export const Append = () => {
  const dispatch = useContext(LinkedListDispatchContext);

  const onButtonClick = useCallback(
    (input?: string) => {
      if (!input || isNaN(+input)) {
        return;
      }

      dispatch({
        type: "APPEND",
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
      label="Append"
      onButtonClick={onButtonClick}
    />
  );
};
