import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { BinarySearchTree } from "./binary-search-tree";

describe("binary search tree", () => {
  describe("clone", () => {
    it("yields tree with the same contents", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });

          const clone = tree.clone();

          expect(clone).not.toBe(tree);
          expect(clone.contents).toEqual(tree.contents);
        }),
      );
    });
    it("yields tree with the same ordered values", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });

          const clone = tree.clone();

          expect(clone).not.toBe(tree);
          expect(clone.orderedValues).toEqual(tree.orderedValues);
        }),
      );
    });
    it("operations on original do not affect clone", () => {
      fc.assert(
        fc.property(fc.uniqueArray(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          const [valueToInsert, ...valuesToAdd] = array;

          valuesToAdd.forEach((member) => {
            tree.insert(member);
          });

          const clone = tree.clone();
          tree.insert(valueToInsert);

          expect(tree.has(valueToInsert)).toBe(true);
          expect(clone.has(valueToInsert)).toBe(false);
        }),
      );
    });
    it("operations on clone do not affect original", () => {
      fc.assert(
        fc.property(fc.uniqueArray(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          const [valueToInsert, ...valuesToAdd] = array;

          valuesToAdd.forEach((member) => {
            tree.insert(member);
          });

          const clone = tree.clone();
          clone.insert(valueToInsert);

          expect(clone.has(valueToInsert)).toBe(true);
          expect(tree.has(valueToInsert)).toBe(false);
        }),
      );
    });
  });

  describe("insert", () => {
    it("retains the same number of contents as is inserted", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });

          expect(tree.orderedValues.length).toBe(array.length);
        }),
      );
    });
    it("orders contents in ascending order", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });

          array.sort((a, b) => a - b);

          expect(tree.orderedValues).toEqual(array);
        }),
      );
    });
  });

  describe("has", () => {
    it("yields has value of true for every inserted member", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });

          array.forEach((member) => {
            expect(tree.has(member)).toBe(true);
          });
        }),
      );
    });
    it("yields has value of false for every non-inserted member", () => {
      fc.assert(
        fc.property(fc.uniqueArray(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          const [nonInserted, ...inserted] = array;

          inserted.forEach((member) => {
            tree.insert(member);
          });

          expect(tree.has(nonInserted)).toBe(false);
        }),
      );
    });
  });

  describe("remove", () => {
    it("removes indicated value when it exists", () => {
      fc.assert(
        fc.property(fc.uniqueArray(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });
          const [valueToRemove, ..._rest] = array;

          tree.remove(valueToRemove);
          expect(tree.has(valueToRemove)).toBe(false);
        }),
      );
    });
    it("lowers number of values by 1 when the removed value exists", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });

          const [valueToRemove, ...remainingValues] = array;

          tree.remove(valueToRemove);

          expect(tree.orderedValues.length).toBe(remainingValues.length);
        }),
      );
    });
    it("yields true when removed value exists", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });
          const [valueToRemove, ..._rest] = array;

          const result = tree.remove(valueToRemove);
          expect(result).toBe(true);
        }),
      );
    });
    it("ordered values remain ordered after removal", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });
          const [valueToRemove, ...remainingValues] = array;

          tree.remove(valueToRemove);

          remainingValues.sort((a, b) => a - b);
          expect(tree.orderedValues).toEqual(remainingValues);
        }),
      );
    });
    it("yields false when removed value does not exist", () => {
      fc.assert(
        fc.property(fc.uniqueArray(fc.integer(), { minLength: 2 }), (array) => {
          const tree = new BinarySearchTree();

          const [valueToOmit, ...valuesToAdd] = array;
          valuesToAdd.forEach((member) => {
            tree.insert(member);
          });

          const result = tree.remove(valueToOmit);
          expect(result).toBe(false);
        }),
      );
    });
    it("does not change number of ordered values when value does not exist", () => {
      fc.assert(
        fc.property(fc.uniqueArray(fc.integer(), { minLength: 2 }), (array) => {
          const tree = new BinarySearchTree();

          const [valueToOmit, ...valuesToAdd] = array;
          valuesToAdd.forEach((member) => {
            tree.insert(member);
          });

          const initialNumberOfContents = tree.orderedValues.length;

          tree.remove(valueToOmit);

          const updatedNumberOfContents = tree.orderedValues.length;
          expect(initialNumberOfContents).toBe(updatedNumberOfContents);
        }),
      );
    });
  });

  describe("structure", () => {
    it("All left values are less than or equal to the root", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });
          const [rootValue, ..._rest] = array;

          const treeContents = tree.contents;
          const leftValues = BinarySearchTree.fromContents(
            treeContents?.left ?? null,
          ).orderedValues;

          expect(leftValues.every((value) => value <= rootValue)).toBe(true);
        }),
      );
    });
    it("All right values are greater than or equal to the root", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (array) => {
          const tree = new BinarySearchTree();

          array.forEach((member) => {
            tree.insert(member);
          });
          const [rootValue, ..._rest] = array;

          const treeContents = tree.contents;
          const rightValues = BinarySearchTree.fromContents(
            treeContents?.right ?? null,
          ).orderedValues;

          expect(rightValues.every((value) => value >= rootValue)).toBe(true);
        }),
      );
    });
  });
});
