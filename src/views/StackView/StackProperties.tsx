import { useContext } from "react";
import { StackContext } from "./state/context";
import { Heading } from "../../components/Heading";

export const StackProperties = ({
  collapseTopMargin,
}: {
  collapseTopMargin?: boolean;
}) => {
  const stack = useContext(StackContext);

  return (
    <div>
      <Heading collapseTopMargin={collapseTopMargin} level={3}>
        Properties
      </Heading>
      <div data-cy="stack-property-size">Size: {stack.members.length}</div>
    </div>
  );
};
