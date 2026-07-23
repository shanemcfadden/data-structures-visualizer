import { Queue } from "../queue";
import { Stack } from "../stack";

export interface IBinarySearchNode<T = number> {
  value: T;
  left: IBinarySearchNode<T> | null;
  right: IBinarySearchNode<T> | null;
}

export class BinarySearchNode implements IBinarySearchNode {
  public value: number;
  public left: BinarySearchNode | null;
  public right: BinarySearchNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  get maxNode(): BinarySearchNode {
    return this.right?.maxNode ?? this;
  }

  get minNode(): BinarySearchNode {
    return this.left?.minNode ?? this;
  }

  get predecessor(): BinarySearchNode | null {
    return this.left?.maxNode ?? null;
  }
  get successor(): BinarySearchNode | null {
    return this.right?.minNode ?? null;
  }

  extractMinimumChild(): BinarySearchNode | null {
    if (!this.left) {
      return null;
    }

    if (this.left.left) {
      return this.left.extractMinimumChild();
    }

    const minChild = this.left;
    this.left = minChild.right;
    minChild.right = null;
    return minChild;
  }

  insert(value: number) {
    if (this.value > value) {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = new BinarySearchNode(value);
      }
    } else {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = new BinarySearchNode(value);
      }
    }
  }

  static foldLeft<T, U>(
    rootNode: IBinarySearchNode<T>,
    folder: (accumulator: U, node: IBinarySearchNode<T>) => U,
    initialValue: U,
  ): U {
    let accumulator = initialValue;

    const parents = new Stack<{
      node: IBinarySearchNode<T>;
      status:
        | "NO_CHILDREN_FOLDED"
        | "LEFT_CHILD_FOLDED"
        | "BOTH_CHILDREN_FOLDED";
    }>([
      {
        node: rootNode,
        status: "NO_CHILDREN_FOLDED",
      },
    ]);

    while (parents.size) {
      const current = parents.pop();
      if (!current) {
        throw new Error(
          "Failed to get current node from Stack with non-zero size",
        );
      }
      if (current.status === "BOTH_CHILDREN_FOLDED") {
        continue;
      }

      if (current.status === "LEFT_CHILD_FOLDED") {
        accumulator = folder(accumulator, current.node);

        if (!current.node.right) {
          continue;
        }

        parents.push({
          node: current.node,
          status: "BOTH_CHILDREN_FOLDED",
        });
        parents.push({
          node: current.node.right,
          status: "NO_CHILDREN_FOLDED",
        });
        continue;
      }

      parents.push({
        node: current.node,
        status: "LEFT_CHILD_FOLDED",
      });

      if (!current.node.left) {
        continue;
      }

      parents.push({
        node: current.node.left,
        status: "NO_CHILDREN_FOLDED",
      });
    }

    return accumulator;
  }

  static map<T, U>(
    rootNode: IBinarySearchNode<T>,
    mapper: (param: T) => U,
  ): IBinarySearchNode<U> {
    const mapQueue = new Queue<{
      sourceNode: IBinarySearchNode<T>;
      mappedNode: IBinarySearchNode<U>;
    }>();
    const mappedRootNode: IBinarySearchNode<U> = {
      value: mapper(rootNode.value),
      left: null,
      right: null,
    };

    mapQueue.enqueue({
      sourceNode: rootNode,
      mappedNode: mappedRootNode,
    });

    while (mapQueue.size) {
      const current = mapQueue.dequeue();
      if (!current) {
        throw new Error(
          "Failed to get current node from Queue with non-zero size",
        );
      }

      if (current.sourceNode.left) {
        current.mappedNode.left = {
          value: mapper(current.sourceNode.left.value),
          left: null,
          right: null,
        };

        mapQueue.enqueue({
          sourceNode: current.sourceNode.left,
          mappedNode: current.mappedNode.left,
        });
      }
      if (current.sourceNode.right) {
        current.mappedNode.right = {
          value: mapper(current.sourceNode.right.value),
          left: null,
          right: null,
        };

        mapQueue.enqueue({
          sourceNode: current.sourceNode.right,
          mappedNode: current.mappedNode.right,
        });
      }
    }

    return mappedRootNode;
  }
}
