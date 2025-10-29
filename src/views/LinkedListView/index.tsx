import { LinkedListProvider } from "./state/LinkedListContext";
import { LinkedListDashboard } from "./LinkedListDashboard";
import { LinkedListViewer } from "./LinkedListViewer";
import { Heading } from "../../components/Heading";
import { Margin } from "../../components/Margin";
import { LinkedListSourceCodeLink } from "./LinkedListSourceCodeLink";

export const LinkedListView = () => (
  <LinkedListProvider>
    <Heading level={2} textCenter>
      Linked List
    </Heading>
    <Margin>
      <LinkedListSourceCodeLink />
    </Margin>
    <LinkedListViewer />
    <LinkedListDashboard />
  </LinkedListProvider>
);
