import { useCallback, useContext, useMemo } from "react";
import { Action } from "../../../components/Action";
import { LinkedListContext, LinkedListDispatchContext } from "../state/context";
import { nullableNumberToString } from "../../../util";

export const RemoveLast = () => {
  const { actionResult, tail } = useContext(LinkedListContext);
  const dispatch = useContext(LinkedListDispatchContext);

  const onClick = useCallback(
    () =>
      dispatch({
        type: "REMOVE_LAST",
      }),
    [dispatch],
  );

  const result = useMemo(() => {
    if (actionResult?.type === "REMOVE_LAST") {
      return nullableNumberToString(actionResult.value);
    }
  }, [actionResult]);

  return (
    <Action
      data-cy="linked-list-method-remove-last"
      disabled={tail === null}
      label="Remove Last"
      onButtonClick={onClick}
      result={result}
      resultLabel="Removed"
    />
  );
};
