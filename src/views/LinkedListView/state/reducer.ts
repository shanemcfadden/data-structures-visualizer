import type { Reducer } from "react";
import { LinkedList } from "../../../models/linked-list";
import type { LinkedListAction, LinkedListState } from "./types";
import { linkedListToState } from "./util";

export const linkedListReducer: Reducer<LinkedListState, LinkedListAction> = (
  state,
  action,
) => {
  const linkedList = new LinkedList(state.list);
  switch (action.type) {
    case "APPEND":
      linkedList.append(action.value);
      break;
    case "PREPEND":
      linkedList.prepend(action.value);
      break;
    case "REMOVE_FIRST":
      linkedList.removeFirst();
      break;
    case "REMOVE_LAST":
      linkedList.removeLast();
      break;
  }
  return linkedListToState(linkedList);
};
