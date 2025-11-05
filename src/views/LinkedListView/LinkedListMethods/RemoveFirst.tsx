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
    if (actionResult?.type === "REMOVE_FIRST") {
      return nullableNumberToString(actionResult.value);
    }
  }, [actionResult]);

  return (
    <Action
      disabled={head === null}
      label="Remove First"
      onButtonClick={onButtonClick}
      result={result}
      resultLabel="Removed"
    />
  );
};
