import { Heading } from "../../../components/Heading";
import { Margin } from "../../../components/Margin";
import { Pop } from "./Pop";
import { Push } from "./Push";

export const StackMethods = ({
  collapseTopMargin,
}: {
  collapseTopMargin?: boolean;
}) => (
  <div>
    <Heading collapseTopMargin={collapseTopMargin} level={3}>
      Methods
    </Heading>
    <Margin weight="small">
      <Push />
    </Margin>
    <Margin weight="small">
      <div className="flex justify-end">
        <Pop />
      </div>
    </Margin>
  </div>
);
