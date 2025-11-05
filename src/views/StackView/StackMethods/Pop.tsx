import { useCallback, useContext, useMemo } from "react";
import { Action } from "../../../components/Action";
import { StackContext, StackDispatchContext } from "../state/context";
import { nullableNumberToString } from "../../../util";

export const Pop = () => {
  const stack = useContext(StackContext);
  const dispatch = useContext(StackDispatchContext);

  const onButtonClick = useCallback(
    () =>
      dispatch({
        type: "POP",
      }),
    [dispatch],
  );

  const result = useMemo(() => {
    if (stack.actionResult?.type === "POP") {
      return nullableNumberToString(stack.actionResult.value);
    }
  }, [stack]);

  return (
    <Action
      disabled={stack.members.length === 0}
      label="Pop"
      onButtonClick={onButtonClick}
      result={result}
      resultLabel="Popped"
    />
  );
};
