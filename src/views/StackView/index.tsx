import { StackProvider } from "./state/StackContext";
import { StackMethods } from "./StackMethods";
import { StackProperties } from "./StackProperties";
import { DataStructureView } from "../DataStructureView";
import { StackViewer } from "./StackViewer";

export const StackView = () => (
  <DataStructureView
    ContextProvider={StackProvider}
    heading="Stack"
    Methods={StackMethods}
    modelPath="src/models/stack.ts"
    Properties={StackProperties}
    Viewer={StackViewer}
    wikiSlug="Stack_(abstract_data_type)"
  />
);
