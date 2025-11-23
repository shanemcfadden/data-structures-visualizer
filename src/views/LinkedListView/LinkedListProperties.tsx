import { useContext } from "react";
import { Heading } from "../../components/Heading";
import { LinkedListContext } from "./state/context";

type LinkedListPropertiesProps = {
  collapseTopMargin?: boolean;
};
export const LinkedListProperties = ({
  collapseTopMargin,
}: LinkedListPropertiesProps) => {
  const { head, list, tail } = useContext(LinkedListContext);

  return (
    <div>
      <Heading collapseTopMargin={collapseTopMargin} level={3}>
        Properties
      </Heading>
      <div data-cy="linked-list-property-head">
        Head value: {head ?? "null"}
      </div>
      <div data-cy="linked-list-property-tail">
        Tail value: {tail ?? "null"}
      </div>
      <div data-cy="linked-list-property-length">Length: {list.length}</div>
    </div>
  );
};
