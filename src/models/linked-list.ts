export class LinkedList<T> implements Iterable<T> {
  head: LinkedListNode<T> | null = null;
  tail: LinkedListNode<T> | null = null;
  length: number = 0;

  constructor(initialList: T[] = []) {
    initialList.forEach((value) => {
      this.append(value);
    });
  }

  append(value: T): void {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this.length++;
  }

  prepend(value: T): void {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  removeLast(): T | null {
    if (!this.head) {
      return null;
    }

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    if (newTail === current) {
      this.head = null;
      this.tail = null;
    } else {
      newTail.next = null;
      this.tail = newTail;
    }

    this.length--;
    return current.value;
  }

  removeFirst(): T | null {
    if (!this.head) {
      return null;
    }

    const currentHead = this.head;
    this.head = currentHead.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return currentHead.value;
  }

  [Symbol.iterator]() {
    let currentNode = this.head;

    return {
      next: (): IteratorResult<T> => {
        if (!currentNode) {
          return { value: undefined, done: true };
        }

        const swap = currentNode;
        currentNode = currentNode.next;

        return { value: swap.value, done: false };
      },
    };
  }
}

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
