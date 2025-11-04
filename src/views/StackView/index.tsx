import { useContext } from "react";
import { Heading } from "../../components/Heading";
import { StackContext } from "./state/context";
import { StackProvider } from "./state/StackContext";
import { StackDashboard } from "./StackDashboard";

export const StackView = () => (
  <StackProvider>
    <Heading level={2} textCenter>
      Stack
    </Heading>
    <StackViewer />
    <StackDashboard />
  </StackProvider>
);

const StackViewer = () => {
  const stack = useContext(StackContext);
  return <div>{...stack.members}</div>;
};
