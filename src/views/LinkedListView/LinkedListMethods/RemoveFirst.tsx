import { useCallback, useContext, useMemo } from "react";
import { Action } from "../../../components/Action";
import { LinkedListContext, LinkedListDispatchContext } from "../state/context";
import { nullableNumberToString } from "../../../util";

export const RemoveFirst = () => {
  const { actionResult, head } = useContext(LinkedListContext);
  const dispatch = useContext(LinkedListDispatchContext);

  const onButtonClick = useCallback(
    () =>
      dispatch({
        type: "REMOVE_FIRST",
      }),
    [dispatch],
  );

  const result = useMemo(() => {
    const label = "Removed";
    if (actionResult?.type === "REMOVE_FIRST") {
      return { label, value: nullableNumberToString(actionResult.value) };
    }

    return { label };
  }, [actionResult]);

  return (
    <Action
      data-cy="linked-list-method-remove-first"
      disabled={head === null}
      label="Remove First"
      onButtonClick={onButtonClick}
      result={result}
    />
  );
};
