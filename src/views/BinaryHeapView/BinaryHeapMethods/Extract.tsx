import { useCallback, useContext, useMemo } from "react";
import { Action } from "../../../components/Action";
import { BinaryHeapContext, BinaryHeapDispatchContext } from "../state/context";
import { nullableNumberToString } from "../../../util";

export const Extract = () => {
  const { actionResult, heap } = useContext(BinaryHeapContext);
  const dispatch = useContext(BinaryHeapDispatchContext);

  const onButtonClick = useCallback(
    () =>
      dispatch({
        type: "EXTRACT",
      }),
    [dispatch],
  );

  const result = useMemo(() => {
    const label = "Extracted";

    if (actionResult?.type === "EXTRACT") {
      return { label, value: nullableNumberToString(actionResult.value) };
    }

    return { label };
  }, [actionResult]);

  return (
    <Action
      data-cy="binary-heap-method-extract"
      disabled={heap.size === 0}
      label="Extract"
      onButtonClick={onButtonClick}
      result={result}
    />
  );
};
