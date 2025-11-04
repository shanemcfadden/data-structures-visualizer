import { useCallback, useContext } from "react";
import { Action } from "../../../../components/Action";
import { StackContext, StackDispatchContext } from "../../state/context";

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

  return (
    <Action
      disabled={stack.members.length === 0}
      label="Pop"
      onButtonClick={onButtonClick}
    />
  );
};
