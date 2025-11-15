import { DataStructureView } from "../DataStructureView";
import { BinaryHeapMethods } from "./BinaryHeapMethods";
import { BinaryHeapProperties } from "./BinaryHeapProperties";
import { BinaryHeapViewer } from "./BinaryHeapViewer";
import { BinaryHeapProvider } from "./state/BinaryHeapContext";

export const BinaryHeapView = () => (
  <DataStructureView
    ContextProvider={BinaryHeapProvider}
    heading="Binary Heap"
    Methods={BinaryHeapMethods}
    modelPath="src/models/heap.ts"
    Properties={BinaryHeapProperties}
    Viewer={BinaryHeapViewer}
    wikiSlug="Binary_heap"
  />
);
