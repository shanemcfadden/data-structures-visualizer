import type { Reducer } from "react";
import { LinkedList } from "../../../models/linked-list";

export type LinkedListState = {
  head: number | null;
  tail: number | null;
  list: number[];
};

export type LinkedListAction =
  | {
      type: "APPEND";
      value: number;
    }
  | {
      type: "PREPEND";
      value: number;
    }
  | {
      type: "REMOVE_FIRST";
    }
  | {
      type: "REMOVE_LAST";
    };

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

export const linkedListToState = (
  linkedList: LinkedList<number>,
): LinkedListState => ({
  head: linkedList.head?.value ?? null,
  tail: linkedList.tail?.value ?? null,
  list: [...linkedList],
});
