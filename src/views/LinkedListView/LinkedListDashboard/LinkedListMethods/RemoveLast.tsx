import { useCallback, useContext } from "react";
import { Action } from "../../../../components/Action";
import {
  LinkedListContext,
  LinkedListDispatchContext,
} from "../../state/context";

export const RemoveLast = () => {
  const { tail } = useContext(LinkedListContext);
  const dispatch = useContext(LinkedListDispatchContext);

  const onClick = useCallback(
    () =>
      dispatch({
        type: "REMOVE_LAST",
      }),
    [dispatch],
  );

  return (
    <Action
      disabled={tail === null}
      label="Remove Last"
      onButtonClick={onClick}
    />
  );
};
