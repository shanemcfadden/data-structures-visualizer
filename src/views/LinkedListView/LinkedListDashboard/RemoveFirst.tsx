import { useCallback, useContext } from "react";
import { LinkedListDispatchContext } from "../state/LinkedListContext";
import { Action } from "../../../components/Action";

export const RemoveFirst = () => {
  const dispatch = useContext(LinkedListDispatchContext);

  const onButtonClick = useCallback(
    () =>
      dispatch({
        type: "REMOVE_FIRST",
      }),
    [dispatch],
  );

  return <Action label="Remove First" onButtonClick={onButtonClick} />;
};
