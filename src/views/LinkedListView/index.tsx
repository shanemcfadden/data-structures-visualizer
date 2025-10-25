import { LinkedListProvider } from "./state/LinkedListContext";
import { LinkedListDashboard } from "./LinkedListDashboard";
import { LinkedListViewer } from "./LinkedListViewer";
import { Heading } from "../../components/Heading";

export const LinkedListView = () => {
  return (
    <LinkedListProvider>
      <Heading level={2} textCenter>
        Linked List
      </Heading>
      <LinkedListViewer />
      <LinkedListDashboard />
    </LinkedListProvider>
  );
};
