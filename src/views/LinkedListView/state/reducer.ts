import type { Reducer } from "react";
import { LinkedList } from "../../../models/linked-list";
import type { LinkedListAction, LinkedListState } from "./types";
import { linkedListToState } from "./util";
import { MAX_LINKED_LIST_LENGTH } from "./constants";

export const linkedListReducer: Reducer<LinkedListState, LinkedListAction> = (
  state,
  action,
) => {
  const linkedList = new LinkedList(state.list);

  switch (action.type) {
    case "APPEND":
      if (linkedList.length < MAX_LINKED_LIST_LENGTH) {
        linkedList.append(action.value);
      }
      return linkedListToState(linkedList);
    case "PREPEND":
      if (linkedList.length < MAX_LINKED_LIST_LENGTH) {
        linkedList.prepend(action.value);
      }
      return linkedListToState(linkedList);
    case "REMOVE_FIRST": {
      const result = linkedList.removeFirst();
      return linkedListToState(linkedList, {
        type: "REMOVE_FIRST",
        value: result,
      });
    }
    case "REMOVE_LAST": {
      const result = linkedList.removeLast();
      return linkedListToState(linkedList, {
        type: "REMOVE_LAST",
        value: result,
      });
    }
  }
};
