import { Heading } from "../../../../components/Heading";
import { Margin } from "../../../../components/Margin";
import { Append } from "./Append";
import { Prepend } from "./Prepend";
import { RemoveFirst } from "./RemoveFirst";
import { RemoveLast } from "./RemoveLast";

type LinkedListMethodsProps = {
  collapseTopMargin?: boolean;
};
export const LinkedListMethods = ({
  collapseTopMargin,
}: LinkedListMethodsProps) => (
  <div>
    <Heading collapseTopMargin={collapseTopMargin} level={3}>
      Methods
    </Heading>
    <Margin weight="small">
      <Append />
    </Margin>
    <Margin weight="small">
      <Prepend />
    </Margin>
    <Margin weight="small">
      <div className="flex justify-between">
        <RemoveFirst />
        <RemoveLast />
      </div>
    </Margin>
  </div>
);
