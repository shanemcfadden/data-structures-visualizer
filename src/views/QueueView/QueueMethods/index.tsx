import { Heading } from "../../../components/Heading";
import { Margin } from "../../../components/Margin";
import { Dequeue } from "./Dequeue";
import { Enqueue } from "./Enqueue";

export const QueueMethods = ({
  collapseTopMargin,
}: {
  collapseTopMargin?: boolean;
}) => (
  <div>
    <Heading collapseTopMargin={collapseTopMargin} level={3}>
      Methods
    </Heading>
    <Margin weight="small">
      <Enqueue />
    </Margin>
    <Margin weight="small">
      <div className="flex justify-end">
        <Dequeue />
      </div>
    </Margin>
  </div>
);
