import { DataStructureView } from "../DataStructureView";
import { BinarySearchTreeMethods } from "./BinarySearchTreeMethods";
import { BinarySearchTreeViewer } from "./BinarySearchTreeViewer";
import { BinarySearchTreeProvider } from "./state/BinarySearchTreeContext";

export const BinarySearchTreeView = () => (
  <DataStructureView
    ContextProvider={BinarySearchTreeProvider}
    heading="Binary Search Tree"
    Methods={BinarySearchTreeMethods}
    modelPath="src/models/binary-search-tree.ts"
    Viewer={BinarySearchTreeViewer}
    wikiSlug="Binary_search_tree"
  />
);
