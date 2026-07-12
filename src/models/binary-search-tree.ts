export class BinarySearchTree<T = number> {
  private root: BinarySearchNode<T> | null;

  constructor() {
    this.root = null;
  }

  get contents(): IBinarySearchNode<T> | null {
    const toInterface = (
      nodeOrNull: BinarySearchNode<T> | null,
    ): IBinarySearchNode<T> | null => {
      if (nodeOrNull === null) {
        return null;
      }

      return {
        value: nodeOrNull.value,
        left: toInterface(nodeOrNull.left),
        right: toInterface(nodeOrNull.right),
      };
    };

    return toInterface(this.root);
  }

  get orderedValues(): T[] {
    const allValues: T[] = [];

    const traverseNodes = (nodeOrNull: BinarySearchNode<T> | null): void => {
      if (!nodeOrNull) {
        return;
      }

      traverseNodes(nodeOrNull.left);
      allValues.push(nodeOrNull.value);
      traverseNodes(nodeOrNull.right);
    };

    traverseNodes(this.root);

    return allValues;
  }

  public insert(value: T) {
    if (!this.root) {
      this.root = new BinarySearchNode(value);
    } else {
      this.root.insert(value);
    }
  }

  public has(value: T): boolean {
    return Boolean(this.findNodeAndNodeSetter(value));
  }

  public remove(value: T): boolean {
    const nodeToRemoveAndNodeSetter = this.findNodeAndNodeSetter(value);

    if (!nodeToRemoveAndNodeSetter) {
      return false;
    }

    const { node: nodeToRemove, replaceNode: replaceNodeToRemove } =
      nodeToRemoveAndNodeSetter;

    if (nodeToRemove.isLeaf) {
      replaceNodeToRemove(null);
    } else if (!nodeToRemove.left) {
      replaceNodeToRemove(nodeToRemove.right);
    } else if (!nodeToRemove.right) {
      replaceNodeToRemove(nodeToRemove.left);
    } else {
      const { successor } = nodeToRemove;

      if (!successor) {
        throw new Error(
          "Successor not found on node with right. This should not be possible",
        );
      }

      if (successor === nodeToRemove.right) {
        replaceNodeToRemove(nodeToRemove.right);
      }

      const minimumChildOfRight = nodeToRemove.right.extractMinimumChild();

      minimumChildOfRight!.left = nodeToRemove.left;
      minimumChildOfRight!.right = nodeToRemove.right;

      replaceNodeToRemove(minimumChildOfRight);
    }
    return true;
  }

  private findNodeAndNodeSetter(value: T): {
    node: BinarySearchNode<T>;
    replaceNode: (replacement: BinarySearchNode<T> | null) => void;
  } | null {
    if (this.root === null) {
      return null;
    }

    if (this.root.value === value) {
      return {
        node: this.root,
        replaceNode: (replacement) => {
          this.root = replacement;
        },
      };
    }

    const findNodeAndNodeSetterFromParentNode = (
      parent: BinarySearchNode<T>,
    ): {
      node: BinarySearchNode<T>;
      replaceNode: (node: BinarySearchNode<T> | null) => void;
    } | null => {
      if (value < parent.value) {
        if (parent.left === null) {
          return null;
        }

        if (value === parent.left) {
          return {
            node: parent.left,
            replaceNode: (replacement) => {
              parent.left = replacement;
            },
          };
        }

        return findNodeAndNodeSetterFromParentNode(parent.left);
      }

      if (parent.right === null) {
        return null;
      }

      if (value === parent.right) {
        return {
          node: parent.right,
          replaceNode: (replacement) => {
            parent.right = replacement;
          },
        };
      }

      return findNodeAndNodeSetterFromParentNode(parent.right);
    };

    return findNodeAndNodeSetterFromParentNode(this.root);
  }
}

interface IBinarySearchNode<T> {
  value: T;
  left: IBinarySearchNode<T> | null;
  right: IBinarySearchNode<T> | null;
}

class BinarySearchNode<T> implements IBinarySearchNode<T> {
  public value: T;
  public left: BinarySearchNode<T> | null;
  public right: BinarySearchNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get maxNode(): BinarySearchNode<T> {
    return this.right?.maxNode ?? this;
  }

  get minNode(): BinarySearchNode<T> {
    return this.left?.minNode ?? this;
  }

  get predecessor(): BinarySearchNode<T> | null {
    return this.left?.maxNode ?? null;
  }
  get successor(): BinarySearchNode<T> | null {
    return this.right?.minNode ?? null;
  }

  extractMinimumChild(): BinarySearchNode<T> | null {
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

  insert(value: T) {
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
}
