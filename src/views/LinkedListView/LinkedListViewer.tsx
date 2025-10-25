import { useContext } from "react";
import { LinkedListContext } from "./state/LinkedListContext";
import { DataStructureViewer } from "../DataStructureViewer";
import { Margin } from "../../components/Margin";

export const LinkedListViewer = () => {
  const { list } = useContext(LinkedListContext);
  return (
    <Margin>
      <DataStructureViewer list={list} />
    </Margin>
  );
};
