import { useContext } from "react";
import { QueueContext } from "./state/context";
import { Heading } from "../../components/Heading";

export const QueueProperties = ({
  collapseTopMargin,
}: {
  collapseTopMargin?: boolean;
}) => {
  const queue = useContext(QueueContext);

  return (
    <div>
      <Heading collapseTopMargin={collapseTopMargin} level={3}>
        Properties
      </Heading>
      <div data-cy="queue-property-size">Size: {queue.members.length}</div>
    </div>
  );
};
