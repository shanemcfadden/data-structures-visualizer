import { LinkedListProvider } from "./state/LinkedListContext";
import { LinkedListViewer } from "./LinkedListViewer";
import { LinkedListMethods } from "./LinkedListDashboard/LinkedListMethods";
import { LinkedListProperties } from "./LinkedListDashboard/LinkedListProperties";
import { DataStructureView } from "../DataStructureView";

export const LinkedListView = () => (
  <DataStructureView
    ContextProvider={LinkedListProvider}
    heading="Linked List"
    Methods={LinkedListMethods}
    modelPath="src/models/linked-list.ts"
    Properties={LinkedListProperties}
    Viewer={LinkedListViewer}
    wikiSlug="Linked_list"
  />
);
