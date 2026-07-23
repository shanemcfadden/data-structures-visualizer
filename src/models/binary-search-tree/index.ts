import { BinarySearchNode, type IBinarySearchNode } from "./binary-search-node";

export class BinarySearchTree {
  private root: BinarySearchNode | null;
  public size: number;

  constructor() {
    this.root = null;
    this.size = 0;
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
    if (!this.root) {
      return [];
    }

    return BinarySearchNode.foldLeft<number, number[]>(
      this.root,
      (allValues, node) => {
        allValues.push(node.value);
        return allValues;
      },
      [],
    );
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

    this.size++;
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

    this.size--;
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
