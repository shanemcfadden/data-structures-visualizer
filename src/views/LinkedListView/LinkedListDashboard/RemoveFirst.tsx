import { useCallback, useContext } from "react";
import { Action } from "../../../components/Action";
import { LinkedListDispatchContext } from "../state/context";

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
