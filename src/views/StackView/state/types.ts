export type StackState = {
  actionResult: StackActionResult | null;
  members: number[];
};

export type StackAction =
  | {
      type: "PUSH";
      value: number;
    }
  | {
      type: "POP";
    };

export type StackActionResult = {
  type: "POP";
  value: number | null;
};
