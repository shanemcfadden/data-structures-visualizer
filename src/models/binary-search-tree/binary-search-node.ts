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

  get isLeaf() {
    return this.left === null && this.right === null;
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
      isLeftFolded: boolean;
      isRightFolded: boolean;
    }>([
      {
        node: rootNode,
        isLeftFolded: false,
        isRightFolded: false,
      },
    ]);

    while (parents.size) {
      const current = parents.pop();
      if (!current) {
        throw new Error(
          "Failed to get current node from Stack with non-zero size",
        );
      }
      if (current.isRightFolded) {
        continue;
      }

      if (current.isLeftFolded) {
        accumulator = folder(accumulator, current.node);

        if (!current.node.right) {
          continue;
        }

        parents.push({
          node: current.node,
          isLeftFolded: true,
          isRightFolded: true,
        });
        parents.push({
          node: current.node.right,
          isLeftFolded: false,
          isRightFolded: false,
        });
        continue;
      }

      parents.push({
        node: current.node,
        isLeftFolded: true,
        isRightFolded: false,
      });

      if (!current.node.left) {
        continue;
      }

      parents.push({
        node: current.node.left,
        isLeftFolded: false,
        isRightFolded: false,
      });
    }

    return accumulator;
  }

  static map<T, U>(
    rootNode: IBinarySearchNode<T>,
    mapper: (param: T) => U,
  ): IBinarySearchNode<U> {
    const toMap = new Queue<{
      originalNode: IBinarySearchNode<T>;
      mappedNode: IBinarySearchNode<U>;
    }>();
    const mappedNodeRoot: IBinarySearchNode<U> = {
      value: mapper(rootNode.value),
      left: null,
      right: null,
    };

    toMap.enqueue({
      originalNode: rootNode,
      mappedNode: mappedNodeRoot,
    });

    while (toMap.size) {
      const current = toMap.dequeue();
      if (!current) {
        throw new Error(
          "Failed to get current node from Queue with non-zero size",
        );
      }

      if (current.originalNode.left) {
        current.mappedNode.left = {
          value: mapper(current.originalNode.left.value),
          left: null,
          right: null,
        };

        toMap.enqueue({
          originalNode: current.originalNode.left,
          mappedNode: current.mappedNode.left,
        });
      }
      if (current.originalNode.right) {
        current.mappedNode.right = {
          value: mapper(current.originalNode.right.value),
          left: null,
          right: null,
        };

        toMap.enqueue({
          originalNode: current.originalNode.right,
          mappedNode: current.mappedNode.right,
        });
      }
    }

    return mappedNodeRoot;
  }
}
