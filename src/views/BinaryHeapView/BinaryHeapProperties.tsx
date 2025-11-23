import { useContext } from "react";
import { Heading } from "../../components/Heading";
import { BinaryHeapContext } from "./state/context";

type BinaryHeapPropertiesProps = {
  collapseTopMargin?: boolean;
};
export const BinaryHeapProperties = ({
  collapseTopMargin,
}: BinaryHeapPropertiesProps) => {
  const { heap } = useContext(BinaryHeapContext);

  return (
    <div>
      <Heading collapseTopMargin={collapseTopMargin} level={3}>
        Properties
      </Heading>
      <div data-cy="binary-heap-property-size">Size: {heap.size}</div>
    </div>
  );
};
