import { createContext, type Dispatch, type SetStateAction } from "react";

export const NavigationSidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});
