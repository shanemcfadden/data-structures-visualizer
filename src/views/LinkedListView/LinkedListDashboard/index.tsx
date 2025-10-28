import { LinkedListProperties } from "./LinkedListProperties";
import { LinkedListMethods } from "./LinkedListMethods";
import { Margin } from "../../../components/Margin";

export const LinkedListDashboard = () => {
  return (
    <Margin>
      <div className="sm:hidden">
        <LinkedListProperties />
        <LinkedListMethods />
      </div>
      <div className="hidden sm:grid sm:grid-cols-2">
        <LinkedListProperties collapseTopMargin />
        <LinkedListMethods collapseTopMargin />
      </div>
    </Margin>
  );
};
