import { useCallback, useContext, useMemo } from "react";
import { Action } from "../../../components/Action";
import {
  BinarySearchTreeContext,
  BinarySearchTreeDispatchContext,
} from "../state/context";
import { UP_TO_THREE_DIGITS_PATTERN } from "../../../constants";

export const Delete = () => {
  const { actionResult, tree } = useContext(BinarySearchTreeContext);
  const dispatch = useContext(BinarySearchTreeDispatchContext);

  const onButtonClick = useCallback(
    (input?: string) => {
      if (!input || isNaN(+input)) {
        return;
      }

      dispatch({
        type: "DELETE",
        value: +input,
      });
    },
    [dispatch],
  );

  const result = useMemo(() => {
    const label = "Deleted";

    if (actionResult?.type === "DELETE") {
      return { label, value: actionResult.value.toString() };
    }
    return { label };
  }, [actionResult]);

  return (
    <Action
      data-cy="binary-search-tree-method-delete"
      disabled={tree.orderedValues.length === 0}
      input
      inputMode="numeric"
      inputPattern={UP_TO_THREE_DIGITS_PATTERN}
      label="Delete"
      onButtonClick={onButtonClick}
      result={result}
    />
  );
};
