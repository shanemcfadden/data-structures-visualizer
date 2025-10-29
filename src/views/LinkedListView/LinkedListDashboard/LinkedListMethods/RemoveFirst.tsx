import { useCallback, useContext } from "react";
import { Action } from "../../../../components/Action";
import {
  LinkedListContext,
  LinkedListDispatchContext,
} from "../../state/context";

export const RemoveFirst = () => {
  const { head } = useContext(LinkedListContext);
  const dispatch = useContext(LinkedListDispatchContext);

  const onButtonClick = useCallback(
    () =>
      dispatch({
        type: "REMOVE_FIRST",
      }),
    [dispatch],
  );

  return (
    <Action
      disabled={head === null}
      label="Remove First"
      onButtonClick={onButtonClick}
    />
  );
};
