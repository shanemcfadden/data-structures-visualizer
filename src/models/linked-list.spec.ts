import { describe, expect, it } from "vitest";
import { LinkedList } from "./linked-list";
import fc from "fast-check";

describe("LinkedList", () => {
  it("should create an empty linked list", () => {
    const list = new LinkedList<number>();
    expect(list.length).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });
  it("should create a non-empty linked list", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const list = new LinkedList<number>(arr);
        expect(list.length).toBe(arr.length);
        expect(list.head?.value).toBe(arr[0]);
        expect(list.tail?.value).toBe(arr[arr.length - 1]);
      }),
    );
  });

  describe("append", () => {
    it("Updates the tail on each append", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
            expect(list.tail?.value).toBe(number);
          });
        }),
      );
    });
    it("Increments length on each append", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number, index) => {
            list.append(number);
            expect(list.length).toBe(index + 1);
          });
        }),
      );
    });
    it("Updates the head on first append", () => {
      fc.assert(
        fc.property(fc.integer(), (number) => {
          const list = new LinkedList<number>();
          list.append(number);
          expect(list.head?.value).toBe(number);
        }),
      );
    });
    it("Maintains head on subsequent appends", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 2 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          expect(list.head?.value).toBe(arr[0]);
        }),
      );
    });
  });

  describe("prepend", () => {
    it("Updates the head on each prepend", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.prepend(number);
            expect(list.head?.value).toBe(number);
          });
        }),
      );
    });
    it("Increments length on each prepend", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number, index) => {
            list.prepend(number);
            expect(list.length).toBe(index + 1);
          });
        }),
      );
    });
    it("Updates the tail on first prepend", () => {
      fc.assert(
        fc.property(fc.integer(), (number) => {
          const list = new LinkedList<number>();
          list.prepend(number);
          expect(list.tail?.value).toBe(number);
        }),
      );
    });
    it("Maintains tail on subsequent prepends", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 2 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.prepend(number);
          });
          expect(list.tail?.value).toBe(arr[0]);
        }),
      );
    });
  });

  describe("removeLast", () => {
    it("Returns null when removing from an empty list", () => {
      const list = new LinkedList<number>();
      expect(list.removeLast()).toBeNull();
    });
    it("Maintains integrity of empty list after removeLast", () => {
      const list = new LinkedList<number>();
      list.removeLast();

      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });
    it("Decrements length on each removeLast", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          for (let i = arr.length - 1; i >= 0; i--) {
            list.removeLast();
            expect(list.length).toBe(i);
          }
        }),
      );
    });
    it("Updates tail correctly on each removeLast", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          for (let i = arr.length - 1; i >= 0; i--) {
            expect(list.tail?.value).toBe(arr[i]);
            list.removeLast();
          }
          expect(list.tail).toBeNull();
        }),
      );
    });
    it("Maintains head on removeLast until list is empty", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          for (let i = arr.length - 1; i > 0; i--) {
            expect(list.head?.value).toBe(arr[0]);
            list.removeLast();
          }
          list.removeLast();
          expect(list.head).toBeNull();
        }),
      );
    });
  });
  describe("removeFirst", () => {
    it("Returns null when removing from an empty list", () => {
      const list = new LinkedList<number>();
      expect(list.removeFirst()).toBeNull();
    });
    it("Maintains integrity of empty list after removeFirst", () => {
      const list = new LinkedList<number>();
      list.removeFirst();

      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });
    it("Decrements length on each removeFirst", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          for (let i = arr.length - 1; i >= 0; i--) {
            list.removeFirst();
            expect(list.length).toBe(i);
          }
        }),
      );
    });
    it("Updates head correctly on each removeFirst", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          for (let i = 0; i < arr.length; i++) {
            expect(list.head?.value).toBe(arr[i]);
            list.removeFirst();
          }
          expect(list.head).toBeNull();
        }),
      );
    });
    it("Maintains tail on removeFirst until list is empty", () => {
      fc.assert(
        fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          for (let i = 0; i < arr.length - 1; i++) {
            expect(list.tail?.value).toBe(arr[arr.length - 1]);
            list.removeFirst();
          }
          list.removeFirst();
          expect(list.tail).toBeNull();
        }),
      );
    });
  });
  describe("iterator", () => {
    it("Should yield values in order when iterating over a non-empty linked list into an array", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const list = new LinkedList<number>();
          arr.forEach((number) => {
            list.append(number);
          });
          expect([...list]).toEqual(arr);
        }),
      );
    });
  });
});
