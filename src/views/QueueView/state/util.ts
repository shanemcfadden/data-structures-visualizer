import { Queue } from "../../../models/queue";
import type { QueueState } from "./types";

export const queueToState = (queue: Queue<number>): QueueState => ({
  members: [...queue],
});

export const initializeState = () => queueToState(new Queue());
