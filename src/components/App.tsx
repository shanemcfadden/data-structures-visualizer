import { Container } from "./Container";
import { LinkedListView } from "../views/LinkedListView";
import { Heading } from "./Heading";

export const App = () => {
  return (
    <Container>
      <Heading level={1} textCenter>
        Data Structures Visualizer
      </Heading>
      <LinkedListView />
    </Container>
  );
};
