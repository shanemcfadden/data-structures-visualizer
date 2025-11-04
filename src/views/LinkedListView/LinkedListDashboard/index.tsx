import { LinkedListProperties } from "./LinkedListProperties";
import { LinkedListMethods } from "./LinkedListMethods";
import { Margin } from "../../../components/Margin";
import { LinkedListSourceCodeLink } from "./LinkedListSourceCodeLink";
import { LinkedListWikiLink } from "./LinkedListWikiLink";

export const LinkedListDashboard = () => (
  <Margin>
    <div className="sm:hidden">
      <LinkedListProperties />
      <LinkedListMethods />
    </div>
    <div className="hidden sm:grid sm:grid-cols-2">
      <LinkedListProperties collapseTopMargin />
      <LinkedListMethods collapseTopMargin />
    </div>
    <div className="flex items-center justify-between">
      <LinkedListSourceCodeLink />
      <LinkedListWikiLink />
    </div>
  </Margin>
);
