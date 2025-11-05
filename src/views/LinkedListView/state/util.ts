import { LinkedList } from "../../../models/linked-list";
import type { LinkedListActionResult, LinkedListState } from "./types";

export const linkedListToState = (
  linkedList: LinkedList<number>,
  actionResult: LinkedListActionResult | null = null,
): LinkedListState => ({
  actionResult,
  head: linkedList.head?.value ?? null,
  list: [...linkedList],
  tail: linkedList.tail?.value ?? null,
});

export const initializeState = () => linkedListToState(new LinkedList());
