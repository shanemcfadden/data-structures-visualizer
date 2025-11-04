export type StackState = {
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
