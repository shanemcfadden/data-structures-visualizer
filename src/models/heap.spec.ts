import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { MinHeap } from "./heap";

describe("heap", () => {
  it("initializes with a size of 0", () => {
    const heap = new MinHeap();
    expect(heap.size).toBe(0);
  });

  describe("members", () => {
    it("indicates number of rows within the heap scaling logarithmically", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          expect(heap.members.length).toBe(
            Math.ceil(Math.log2(array.length + 1)),
          );
        }),
      );
    });
    it("each row should be double the length of the previous row (except for the final row)", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          const calculatedMembers = heap.members;
          for (let i = 0; i < calculatedMembers.length - 2; i++) {
            const j = i + 1;
            expect(calculatedMembers[j].length).toBe(
              calculatedMembers[i].length * 2,
            );
          }
        }),
      );
    });
    it("number of members should equal the number inserted into the heap", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          expect(heap.members.flat().length).toEqual(array.length);
        }),
      );
    });
    it("members should be less than or equal two existing children", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          const calculatedMembers = heap.members;
          calculatedMembers.forEach((row, i) => {
            row.forEach((member, j) => {
              const leftChild = calculatedMembers[i + 1]?.[j * 2];
              if (leftChild !== undefined) {
                expect(leftChild).toBeGreaterThanOrEqual(member);
              }
              const rightChild = calculatedMembers[i + 1]?.[j * 2 + 1];
              if (rightChild !== undefined) {
                expect(rightChild).toBeGreaterThanOrEqual(member);
              }
            });
          });
        }),
      );
    });
  });

  describe("insert", () => {
    it("increments the size by one", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member, i) => {
            heap.insert(member);
            expect(heap.size).toBe(i + 1);
          });
        }),
      );
    });
    it("maintains branch ordering on insert", () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 8 }), (heapRows) => {
          const heap = new MinHeap();

          for (let i = 0; i < heapRows; i++) {
            const numberOfMembersInRow = 2 ** i;

            for (let j = 0; j < numberOfMembersInRow; j++) {
              heap.insert(j);
            }
          }

          const members = heap.members;

          members.forEach((row) => {
            expect(row[0]).toBe(0);
          });
        }),
      );
    });
  });

  describe("clone", () => {
    it("creates a new heap with the same members", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          const clonedHeap = heap.clone();

          expect(clonedHeap.size).toBe(heap.size);
          expect(clonedHeap.members).toEqual(heap.members);
        }),
      );
    });
    it("modifications to the cloned heap do not affect the original heap", () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.integer(),
          (array, additionalInteger) => {
            const heap = new MinHeap();

            array.forEach((member) => {
              heap.insert(member);
            });
            const clonedHeap = heap.clone();
            clonedHeap.insert(additionalInteger);

            expect(clonedHeap.size).toBe(heap.size + 1);
            expect(heap.size).toBe(array.length);
          },
        ),
      );
    });
    it("modifications to the original heap do not affect the cloned heap", () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.integer(),
          (array, additionalInteger) => {
            const heap = new MinHeap();

            array.forEach((member) => {
              heap.insert(member);
            });
            const clonedHeap = heap.clone();
            heap.insert(additionalInteger);

            expect(heap.size).toBe(clonedHeap.size + 1);
            expect(clonedHeap.size).toBe(array.length);
          },
        ),
      );
    });
  });

  describe("extract", () => {
    it("decrements the size by one", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          array.forEach((_member, i) => {
            heap.extract();
            expect(heap.size).toBe(array.length - i - 1);
          });
        }),
      );
    });

    it("yields null when there are no heap members to extract", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          array.forEach(() => {
            heap.extract();
          });

          const result = heap.extract();
          expect(result).toBeNull();
        }),
      );
    });

    it("retains size of 0 when there are no heap members to extract", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          array.forEach(() => {
            heap.extract();
          });

          heap.extract();
          expect(heap.size).toBe(0);
        }),
      );
    });

    it("extracts heap members in ascending order", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (array) => {
          const heap = new MinHeap();

          array.forEach((member) => {
            heap.insert(member);
          });

          array.sort((a, b) => a - b);

          array.forEach((member) => {
            const extractedResult = heap.extract();
            expect(extractedResult).toBe(member);
          });
        }),
      );
    });
  });
});
