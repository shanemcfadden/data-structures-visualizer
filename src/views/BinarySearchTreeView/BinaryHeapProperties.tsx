import { useContext } from "react";
import { Heading } from "../../components/Heading";
import { BinarySearchTreeContext } from "./state/context";

type BinarySearchTreePropertiesProps = {
  collapseTopMargin?: boolean;
};
export const BinarySearchTreeProperties = ({
  collapseTopMargin,
}: BinarySearchTreePropertiesProps) => {
  const { tree } = useContext(BinarySearchTreeContext);

  return (
    <div>
      <Heading collapseTopMargin={collapseTopMargin} level={3}>
        Properties
      </Heading>
      <div data-cy="binary-search-tree-property-size">Size: {tree.size}</div>
    </div>
  );
};
