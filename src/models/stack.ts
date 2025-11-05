import { LinkedList } from "./linked-list";

export class Stack<T> implements Iterable<T> {
  private linkedList: LinkedList<T>;

  constructor(initialStack: T[] = []) {
    this.linkedList = new LinkedList<T>(initialStack);
  }

  get size() {
    return this.linkedList.length;
  }

  pop() {
    return this.linkedList.removeFirst();
  }

  push(item: T) {
    return this.linkedList.prepend(item);
  }

  // Head of the linked list is the top of the stack
  [Symbol.iterator]() {
    return this.linkedList[Symbol.iterator]();
  }
}
