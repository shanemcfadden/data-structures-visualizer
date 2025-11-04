import { useContext } from "react";
import { StackContext } from "./state/context";
import { StackProvider } from "./state/StackContext";
import { StackMethods } from "./StackMethods";
import { StackProperties } from "./StackProperties";
import { DataStructureView } from "../DataStructureView";

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

const StackViewer = () => {
  const stack = useContext(StackContext);
  return <div>{stack.members.join(", ")}</div>;
};
