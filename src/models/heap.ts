import { cloneDeep } from "lodash-es";

class BinaryHeap<T = number> {
  private readonly array: T[] = [];
  private readonly compareFunction: CompareFunction<T>;

  constructor(compareFunction: CompareFunction<T>, array: T[] = []) {
    this.array = array;
    this.compareFunction = compareFunction;
  }

  get members(): T[][] {
    return this.array.reduce<T[][]>((accumulator, member, i) => {
      const memberRow = Math.floor(Math.log2(i + 1));
      accumulator[memberRow] ??= [];
      accumulator[memberRow].push(member);
      return accumulator;
    }, []);
  }

  get size() {
    return this.array.length;
  }

  public clone(): BinaryHeap<T> {
    return new BinaryHeap<T>(this.compareFunction, cloneDeep(this.array));
  }

  public insert(element: T) {
    this.array.push(element);
    this.upHeap();
  }

  public extract(): T | null {
    if (this.array.length === 0) {
      return null;
    }

    this.swapIndices(0, this.array.length - 1);
    const extracted = this.array.pop() ?? null;

    this.downHeap();
    return extracted;
  }

  private downHeap(parentIndex = 0) {
    const [leftChildIndex, rightChildIndex] = this.toChildIndices(parentIndex);

    if (leftChildIndex === null) {
      return;
    }

    const parentValue = this.array[parentIndex];
    let minimumChildIndex: number;

    if (rightChildIndex === null) {
      const childValue = this.array[leftChildIndex];

      if (this.isAscending(parentValue, childValue)) {
        return;
      }

      minimumChildIndex = leftChildIndex;
    } else {
      const leftChildValue = this.array[leftChildIndex];
      const rightChildValue = this.array[rightChildIndex];

      if (
        this.isAscending(parentValue, leftChildValue) &&
        this.isAscending(parentValue, rightChildValue)
      ) {
        return;
      }

      minimumChildIndex = this.isAscending(leftChildValue, rightChildValue)
        ? leftChildIndex
        : rightChildIndex;
    }

    this.swapIndices(parentIndex, minimumChildIndex);
    this.downHeap(minimumChildIndex);
  }

  private upHeap(childIndex = this.array.length - 1) {
    const parentIndex = this.toParentIndex(childIndex);
    if (parentIndex === null) {
      return;
    }

    const childValue = this.array[childIndex];
    const parentValue = this.array[parentIndex];

    if (!this.isAscending(childValue, parentValue)) {
      return;
    }

    this.swapIndices(childIndex, parentIndex);
    this.upHeap(parentIndex);
  }

  private isAscending(a: T, b: T) {
    return this.compareFunction(a, b) < 0;
  }

  private swapIndices(i: number, j: number) {
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
  }

  private toChildIndices(i: number): [number | null, number | null] {
    const left = i * 2 + 1;
    const right = i * 2 + 2;

    return [
      left >= this.array.length ? null : left,
      right >= this.array.length ? null : right,
    ];
  }

  private toParentIndex(i: number): number | null {
    if (i < 0) {
      throw new Error(`Attempted to find parent index of negative number ${i}`);
    }
    if (i === 0) {
      return null;
    }
    return Math.floor(i - 1 / 2);
  }
}

export class MinHeap extends BinaryHeap<number> {
  constructor() {
    super((a: number, b: number) => a - b);
  }
}

type CompareFunction<T> = (a: T, b: T) => number;
