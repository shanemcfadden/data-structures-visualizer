import type { Reducer } from "react";
import { Queue } from "../../../models/queue";
import type { QueueAction, QueueState } from "./types";
import { queueToState } from "./util";
import { MAX_QUEUE_SIZE } from "./constants";

export const queueReducer: Reducer<QueueState, QueueAction> = (
  state,
  action,
) => {
  const queue = new Queue(state.members);
  switch (action.type) {
    case "ENQUEUE":
      if (queue.size < MAX_QUEUE_SIZE) {
        queue.enqueue(action.value);
      }
      return queueToState(queue);
    case "DEQUEUE": {
      const result = queue.dequeue();
      return queueToState(queue, {
        type: "DEQUEUE",
        value: result,
      });
    }
  }
};
