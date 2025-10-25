import { useContext } from "react";
import { LinkedListContext } from "../state/LinkedListContext";
import { Append } from "./Append";
import { Prepend } from "./Prepend";
import { RemoveFirst } from "./RemoveFirst";
import { RemoveLast } from "./RemoveLast";
import { Margin } from "../../../components/Margin";
import { Heading } from "../../../components/Heading";

export const LinkedListDashboard = () => {
  const { head, list, tail } = useContext(LinkedListContext);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <Heading collapseTopMargin level={3}>
            Properties
          </Heading>
          <div>Head value: {head ?? "null"}</div>
          <div>Tail value: {tail ?? "null"}</div>
          <div>Length: {list.length}</div>
        </div>
        <div>
          <Heading collapseTopMargin level={3}>
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
      </div>
    </div>
  );
};
