import { Heading } from "../../../components/Heading";
import { Margin } from "../../../components/Margin";
import { Delete } from "./Delete";
import { Insert } from "./Insert";

export const BinarySearchTreeMethods = ({
  collapseTopMargin,
}: {
  collapseTopMargin?: boolean;
}) => (
  <div>
    <Heading collapseTopMargin={collapseTopMargin} level={3}>
      Methods
    </Heading>
    <Margin weight="small">
      <Insert />
    </Margin>
    <Margin weight="small">
      <Delete />
    </Margin>
  </div>
);
