export type QueueState = {
  actionResult: QueueActionResult | null;
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

export type QueueActionResult = {
  type: "DEQUEUE";
  value: number | null;
};
