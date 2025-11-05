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
      if (queue.size >= MAX_QUEUE_SIZE) {
        break;
      }
      queue.enqueue(action.value);
      break;
    case "DEQUEUE":
      queue.dequeue();
      break;
  }
  return queueToState(queue);
};
