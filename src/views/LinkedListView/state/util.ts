import { LinkedList } from "../../../models/linked-list";
import type { LinkedListState } from "./types";

export const linkedListToState = (
  linkedList: LinkedList<number>,
): LinkedListState => ({
  head: linkedList.head?.value ?? null,
  tail: linkedList.tail?.value ?? null,
  list: [...linkedList],
});

export const initializeState = () => linkedListToState(new LinkedList());
