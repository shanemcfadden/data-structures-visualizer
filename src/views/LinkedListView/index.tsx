import { LinkedListProvider } from "./state/LinkedListContext";
import { LinkedListDashboard } from "./LinkedListDashboard";
import { LinkedListViewer } from "./LinkedListViewer";
import { Heading } from "../../components/Heading";
import { LinkedListSourceCodeLink } from "./LinkedListSourceCodeLink";
import { Margin } from "../../components/Margin";

export const LinkedListView = () => (
  <LinkedListProvider>
    <div className="sm:hidden">
      <Heading level={2} textCenter>
        Linked List
      </Heading>
      <Heading level={3} textCenter>
        <LinkedListSourceCodeLink />
      </Heading>
      <LinkedListViewer />
      <LinkedListDashboard />
    </div>
    <div className="hidden sm:block">
      <Margin>
        <div className="flex items-center justify-between">
          <Heading collapseTopMargin collapseBottomMargin level={2}>
            Linked List
          </Heading>
          <Heading collapseTopMargin collapseBottomMargin level={3}>
            <LinkedListSourceCodeLink />
          </Heading>
        </div>
      </Margin>
      <LinkedListDashboard />
      <LinkedListViewer />
    </div>
  </LinkedListProvider>
);
