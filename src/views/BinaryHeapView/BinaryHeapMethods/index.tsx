import { Heading } from "../../../components/Heading";
import { Margin } from "../../../components/Margin";
import { Extract } from "./Extract";
import { Insert } from "./Insert";

export const BinaryHeapMethods = ({
  collapseTopMargin,
}: {
  collapseTopMargin?: boolean;
}) => (
  <div>
    <Heading collapseTopMargin={collapseTopMargin} level={3}>
      Methods
    </Heading>
    <Margin weight="small">
      <Extract />
    </Margin>
    <Margin weight="small">
      <Insert />
    </Margin>
  </div>
);
