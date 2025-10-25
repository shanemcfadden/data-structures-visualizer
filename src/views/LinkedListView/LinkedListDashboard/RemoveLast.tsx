import { useCallback, useContext } from "react";
import { LinkedListDispatchContext } from "../state/LinkedListContext";
import { Action } from "../../../components/Action";

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
