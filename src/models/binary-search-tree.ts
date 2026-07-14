export class BinarySearchTree {
  private root: BinarySearchNode | null;

  constructor() {
    this.root = null;
  }

  get contents(): IBinarySearchNode | null {
    const toInterface = (
      nodeOrNull: BinarySearchNode | null,
    ): IBinarySearchNode | null => {
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

  get orderedValues(): number[] {
    const allValues: number[] = [];

    const traverseNodes = (nodeOrNull: BinarySearchNode | null): void => {
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

  static fromContents(contents: IBinarySearchNode | null): BinarySearchTree {
    const tree = new BinarySearchTree();

    const insertNodes = (node: IBinarySearchNode | null): void => {
      if (!node) {
        return;
      }

      tree.insert(node.value);
      insertNodes(node.left);
      insertNodes(node.right);
    };

    insertNodes(contents);

    return tree;
  }

  public clone(): BinarySearchTree {
    return BinarySearchTree.fromContents(this.contents);
  }

  public insert(value: number) {
    if (!this.root) {
      this.root = new BinarySearchNode(value);
    } else {
      this.root.insert(value);
    }
  }

  public has(value: number): boolean {
    return Boolean(this.findNodeAndNodeSetter(value));
  }

  public delete(value: number): boolean {
    const nodeToDeleteAndNodeSetter = this.findNodeAndNodeSetter(value);

    if (!nodeToDeleteAndNodeSetter) {
      return false;
    }

    const { node: nodeToDelete, replaceNode: replaceNodeToDelete } =
      nodeToDeleteAndNodeSetter;

    if (nodeToDelete.isLeaf) {
      replaceNodeToDelete(null);
    } else if (!nodeToDelete.left) {
      replaceNodeToDelete(nodeToDelete.right);
    } else if (!nodeToDelete.right) {
      replaceNodeToDelete(nodeToDelete.left);
    } else {
      const { successor } = nodeToDelete;

      if (!successor) {
        throw new Error(
          "Successor not found on node with right. This should not be possible.",
        );
      }

      if (successor === nodeToDelete.right) {
        nodeToDelete.right.left = nodeToDelete.left;
        replaceNodeToDelete(nodeToDelete.right);
      } else {
        const minimumChildOfRight = nodeToDelete.right.extractMinimumChild();

        if (!minimumChildOfRight) {
          throw new Error(
            "Minimum child of right not found when node's successor does not equal right. This should not be possible.",
          );
        }

        minimumChildOfRight.left = nodeToDelete.left;
        minimumChildOfRight.right = nodeToDelete.right;

        replaceNodeToDelete(minimumChildOfRight);
      }
    }
    return true;
  }

  private findNodeAndNodeSetter(value: number): {
    node: BinarySearchNode;
    replaceNode: (replacement: BinarySearchNode | null) => void;
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
      parent: BinarySearchNode,
    ): {
      node: BinarySearchNode;
      replaceNode: (node: BinarySearchNode | null) => void;
    } | null => {
      if (value < parent.value) {
        if (parent.left === null) {
          return null;
        }

        if (value === parent.left.value) {
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

      if (value === parent.right.value) {
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

export interface IBinarySearchNode<T = number> {
  value: T;
  left: IBinarySearchNode<T> | null;
  right: IBinarySearchNode<T> | null;
}

class BinarySearchNode implements IBinarySearchNode {
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
}
