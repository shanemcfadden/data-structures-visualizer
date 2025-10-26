import { useContext } from "react";
import { DataStructureViewer } from "../DataStructureViewer";
import { Margin } from "../../components/Margin";
import { LinkedListContext } from "./state/context";

export const LinkedListViewer = () => {
  const { list } = useContext(LinkedListContext);
  return (
    <Margin>
      <DataStructureViewer list={list} />
    </Margin>
  );
};
