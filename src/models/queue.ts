import { LinkedList } from "./linked-list";

export class Queue<T> implements Iterable<T> {
  private linkedList: LinkedList<T>;

  constructor(initialQueue: T[] = []) {
    this.linkedList = new LinkedList(initialQueue);
  }

  get size() {
    return this.linkedList.length;
  }

  dequeue() {
    return this.linkedList.removeFirst();
  }

  enqueue(item: T) {
    return this.linkedList.append(item);
  }

  [Symbol.iterator]() {
    return this.linkedList[Symbol.iterator]();
  }
}
