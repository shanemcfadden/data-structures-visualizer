import { useCallback, useContext, useMemo } from "react";
import { Action } from "../../../components/Action";
import { StackContext, StackDispatchContext } from "../state/context";

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

  const popResult = useMemo(() => {
    if (stack.actionResult?.type === "POP") {
      return stack.actionResult.value === null
        ? "null"
        : stack.actionResult.value.toString();
    }
  }, [stack]);

  return (
    <Action
      disabled={stack.members.length === 0}
      label="Pop"
      onButtonClick={onButtonClick}
      result={popResult}
      resultLabel="Popped"
    />
  );
};
