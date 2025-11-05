import { describe, expect, it } from "vitest";
import { Queue } from "./queue";
import fc from "fast-check";

describe("Queue", () => {
  it("should create an empty queue", () => {
    const queue = new Queue<number>();
    expect(queue.size).toBe(0);
    expect(queue.dequeue()).toBeNull();
  });
  it("should create a non-empty queue", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const queue = new Queue<number>(arr);
        expect(queue.size).toBe(arr.length);
        expect(queue.dequeue()).toBe(arr[0] ?? null);
      }),
    );
  });

  describe("dequeue", () => {
    it("Reduces size by one each dequeue when size is greater than 1", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const queue = new Queue<number>(arr);
          queue.dequeue();
          expect(queue.size).toBe(arr.length - 1);
        }),
      );
    });
    it("Maintains size of zero when size equals zero", () => {
      const queue = new Queue<number>();
      queue.dequeue();
      expect(queue.size).toBe(0);
    });

    it("Yields null when queue is empty", () => {
      const queue = new Queue<number>();
      expect(queue.dequeue()).toBeNull();
    });
    it("Yields enqueued members in order", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const queue = new Queue<number>();
          arr.forEach((member) => {
            queue.enqueue(member);
          });

          for (let i = 0; i < arr.length; i++) {
            const dequeued = queue.dequeue();
            expect(dequeued).toBe(arr[i]);
          }
        }),
      );
    });
    it("Yields array members in order", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const queue = new Queue<number>(arr);

          for (let i = 0; i < arr.length; i++) {
            const dequeued = queue.dequeue();
            expect(dequeued).toBe(arr[i]);
          }
        }),
      );
    });
    it("Yields enqueued members after yielding array members", () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.array(fc.integer()),
          (enqueuedMembers, initializedMembers) => {
            const queue = new Queue<number>(initializedMembers);
            enqueuedMembers.forEach((member) => {
              queue.enqueue(member);
            });

            for (let i = 0; i < initializedMembers.length; i++) {
              const dequeued = queue.dequeue();
              expect(dequeued).toBe(initializedMembers[i]);
            }

            for (let i = 0; i < enqueuedMembers.length; i++) {
              const dequeued = queue.dequeue();
              expect(dequeued).toBe(enqueuedMembers[i]);
            }

            expect(queue.size).toBe(0);
          },
        ),
      );
    });
  });

  describe("enqueue", () => {
    it("Increases size by 1", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), fc.integer(), (arr, newMember) => {
          const queue = new Queue<number>(arr);
          const initialSize = queue.size;

          queue.enqueue(newMember);
          expect(queue.size).toBe(initialSize + 1);
        }),
      );
    });
  });

  describe("iterator", () => {
    it("Yields members of the queue in the same order they were added", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const queue = new Queue<number>(arr);
          expect([...queue]).toEqual(arr);
        }),
      );
    });
    it("Does not alter size of existing queue on iteration", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const queue = new Queue<number>(arr);
          const initialSize = queue.size;

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          [...queue];

          expect(queue.size).toBe(initialSize);
        }),
      );
    });
  });
});
