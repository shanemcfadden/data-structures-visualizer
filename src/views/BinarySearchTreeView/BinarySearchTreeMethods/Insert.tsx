import { useCallback, useContext } from "react";
import {
  BinarySearchTreeContext,
  BinarySearchTreeDispatchContext,
} from "../state/context";
import { Action } from "../../../components/Action";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";
import { MAX_BINARY_SEARCH_TREE_SIZE } from "../state/constants";

export const Insert = () => {
  const { tree } = useContext(BinarySearchTreeContext);
  const dispatch = useContext(BinarySearchTreeDispatchContext);

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
      data-cy="binary-search-tree-method-insert"
      disabled={tree.orderedValues.length >= MAX_BINARY_SEARCH_TREE_SIZE}
      input
      inputMode="numeric"
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      inputPlaceholder={"1"}
      label="Insert"
      onButtonClick={onButtonClick}
    />
  );
};
