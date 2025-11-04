import { LinkedListProvider } from "./state/LinkedListContext";
import { LinkedListDashboard } from "./LinkedListDashboard";
import { LinkedListViewer } from "./LinkedListViewer";
import { Heading } from "../../components/Heading";

export const LinkedListView = () => (
  <LinkedListProvider>
    <Heading level={2} textCenter>
      Linked List
    </Heading>

    <div className="hidden sm:block">
      <LinkedListDashboard />
    </div>

    {/** 
        Declaring LinkedListViewer's underlying DataStructureViewer twice (once hidden and once not) breaks Svg Def references.

        For now it can be declared just once. Will revisit later if necessary.
    */}
    <LinkedListViewer />

    <div className="sm:hidden">
      <LinkedListDashboard />
    </div>
  </LinkedListProvider>
);
