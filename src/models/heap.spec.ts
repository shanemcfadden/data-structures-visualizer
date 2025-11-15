import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { MinHeap } from "./heap";

describe("heap", () => {
  it("initializes with a size of 0", () => {
    const heap = new MinHeap();
    expect(heap.size).toBe(0);
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

          const originalMembers: number[] = [];
          const clonedMembers: number[] = [];

          while (heap.size > 0) {
            const originalExtracted = heap.extract();
            if (originalExtracted !== null) {
              originalMembers.push(originalExtracted);
            }
          }

          while (clonedHeap.size > 0) {
            const clonedExtracted = clonedHeap.extract();
            if (clonedExtracted !== null) {
              clonedMembers.push(clonedExtracted);
            }
          }

          expect(clonedMembers).toEqual(originalMembers);
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
