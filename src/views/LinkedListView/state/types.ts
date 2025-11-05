export type LinkedListState = {
  actionResult: LinkedListActionResult | null;
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

export type LinkedListActionResult =
  | {
      type: "REMOVE_FIRST";
      value: number | null;
    }
  | {
      type: "REMOVE_LAST";
      value: number | null;
    };
