import { useCallback, useContext } from "react";
import { Action } from "../../../../components/Action";
import { LinkedListDispatchContext } from "../../state/context";

export const RemoveLast = () => {
  const dispatch = useContext(LinkedListDispatchContext);

  const onClick = useCallback(
    () =>
      dispatch({
        type: "REMOVE_LAST",
      }),
    [dispatch],
  );

  return <Action label="Remove Last" onButtonClick={onClick} />;
};
