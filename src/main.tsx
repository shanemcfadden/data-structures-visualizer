import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./views/Layout.tsx";
import { LinkedListView } from "./views/LinkedListView/index.tsx";
import { StackView } from "./views/StackView/index.tsx";
import { Navigation } from "./views/Navigation.tsx";
import { QueueView } from "./views/QueueView/index.tsx";

const App = () => (
  <StrictMode>
    <BrowserRouter basename="data-structures-visualizer">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigation />} />
          <Route path="linked-list" element={<LinkedListView />} />
          <Route path="queue" element={<QueueView />} />
          <Route path="stack" element={<StackView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
export default App;
