import { QueueProvider } from "./state/QueueContext";
import { QueueMethods } from "./QueueMethods";
import { QueueProperties } from "./QueueProperties";
import { DataStructureView } from "../DataStructureView";
import { QueueViewer } from "./QueueViewer";

export const QueueView = () => (
  <DataStructureView
    ContextProvider={QueueProvider}
    heading="Queue"
    Methods={QueueMethods}
    modelPath="src/models/queue.ts"
    Properties={QueueProperties}
    Viewer={QueueViewer}
    wikiSlug="Queue_(abstract_data_type)"
  />
);
