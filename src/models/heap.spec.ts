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
