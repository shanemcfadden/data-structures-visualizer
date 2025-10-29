import { useCallback, useContext } from "react";
import { Action } from "../../../../components/Action";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../../constants";
import {
  LinkedListContext,
  LinkedListDispatchContext,
} from "../../state/context";
import { MAX_LINKED_LIST_LENGTH } from "../../state/constants";

export const Append = () => {
  const { list } = useContext(LinkedListContext);
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
      disabled={list.length >= MAX_LINKED_LIST_LENGTH}
      input
      inputMode="numeric"
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      inputPlaceholder={"1"}
      label="Append"
      onButtonClick={onButtonClick}
    />
  );
};
