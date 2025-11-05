export type QueueState = {
  members: number[];
};

export type QueueAction =
  | {
      type: "ENQUEUE";
      value: number;
    }
  | {
      type: "DEQUEUE";
    };
