import { Queue } from "../../../models/queue";
import type { QueueActionResult, QueueState } from "./types";

export const queueToState = (
  queue: Queue<number>,
  actionResult: QueueActionResult | null = null,
): QueueState => ({
  actionResult,
  members: [...queue],
});

export const initializeState = () => queueToState(new Queue());
