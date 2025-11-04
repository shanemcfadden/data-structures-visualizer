import { LinkedList } from "./linked-list";

export class Stack<T> {
  private linkedList: LinkedList<T>;

  constructor(initialStack: T[] = []) {
    this.linkedList = new LinkedList<T>(initialStack);
  }

  get size() {
    return this.linkedList.length;
  }

  pop() {
    return this.linkedList.removeLast();
  }

  push(item: T) {
    return this.linkedList.append(item);
  }
}
