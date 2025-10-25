import {
  createContext,
  useReducer,
  type ActionDispatch,
  type PropsWithChildren,
} from "react";
import {
  linkedListReducer,
  linkedListToState,
  type LinkedListAction,
} from "./reducer";
import { LinkedList } from "../../../models/linked-list";

const initializeState = () => linkedListToState(new LinkedList());

export const LinkedListContext = createContext(initializeState());
export const LinkedListDispatchContext = createContext<
  ActionDispatch<[action: LinkedListAction]>
>(() => {});

export const LinkedListProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    linkedListReducer,
    undefined,
    initializeState,
  );

  return (
    <LinkedListContext value={state}>
      <LinkedListDispatchContext value={dispatch}>
        {children}
      </LinkedListDispatchContext>
    </LinkedListContext>
  );
};
