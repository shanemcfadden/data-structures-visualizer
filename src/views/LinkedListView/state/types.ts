export type LinkedListState = {
  head: number | null;
  tail: number | null;
  list: number[];
};

export type LinkedListAction =
  | {
      type: "APPEND";
      value: number;
    }
  | {
      type: "PREPEND";
      value: number;
    }
  | {
      type: "REMOVE_FIRST";
    }
  | {
      type: "REMOVE_LAST";
    };
