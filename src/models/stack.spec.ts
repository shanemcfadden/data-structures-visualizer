import { describe, expect, it } from "vitest";
import { Stack } from "./stack";
import fc from "fast-check";

describe("Stack", () => {
  it("should create an empty stack", () => {
    const stack = new Stack<number>();
    expect(stack.size).toBe(0);
    expect(stack.pop()).toBeNull();
  });
  it("should create a non-empty stack", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const stack = new Stack<number>(arr);
        expect(stack.size).toBe(arr.length);
        expect(stack.pop()).toBe(arr[0] ?? null);
      }),
    );
  });

  describe("pop", () => {
    it("Reduces size by one each pop when size is greater than 1", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const stack = new Stack<number>(arr);
          stack.pop();
          expect(stack.size).toBe(arr.length - 1);
        }),
      );
    });
    it("Maintains size of zero when size equals zero", () => {
      const stack = new Stack<number>();
      stack.pop();
      expect(stack.size).toBe(0);
    });

    it("Yields null when stack is empty", () => {
      const stack = new Stack<number>();
      expect(stack.pop()).toBeNull();
    });
    it("Yields pushed members in reverse order", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const stack = new Stack<number>();
          arr.forEach((member) => {
            stack.push(member);
          });

          for (let i = 0; i < arr.length; i++) {
            const popped = stack.pop();
            expect(popped).toBe(arr[arr.length - 1 - i]);
          }
        }),
      );
    });
    it("Yields array members in order", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const stack = new Stack<number>(arr);

          for (let i = 0; i < arr.length; i++) {
            const popped = stack.pop();
            expect(popped).toBe(arr[i]);
          }
        }),
      );
    });
    it("Yields pushed members before yielding array members", () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.array(fc.integer()),
          (pushedMembers, initializedMembers) => {
            const stack = new Stack<number>(initializedMembers);
            pushedMembers.forEach((member) => {
              stack.push(member);
            });

            for (let i = 0; i < pushedMembers.length; i++) {
              const popped = stack.pop();
              expect(popped).toBe(pushedMembers[pushedMembers.length - 1 - i]);
            }

            for (let i = 0; i < initializedMembers.length; i++) {
              const popped = stack.pop();
              expect(popped).toBe(initializedMembers[i]);
            }

            expect(stack.size).toBe(0);
          },
        ),
      );
    });
  });

  describe("push", () => {
    it("Increases size by 1", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), fc.integer(), (arr, newMember) => {
          const stack = new Stack<number>(arr);
          const initialSize = stack.size;

          stack.push(newMember);
          expect(stack.size).toBe(initialSize + 1);
        }),
      );
    });
  });

  describe("iterator", () => {
    it("Yields members of the stack in the same order they were added", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const stack = new Stack<number>(arr);
          expect([...stack]).toEqual(arr);
        }),
      );
    });
    it("Does not alter size of existing stack on iteration", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const stack = new Stack<number>(arr);
          const initialSize = stack.size;

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          [...stack];

          expect(stack.size).toBe(initialSize);
        }),
      );
    });
  });
});
