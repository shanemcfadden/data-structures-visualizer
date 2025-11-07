import { useContext } from "react";
import { NavigationSidebarContext } from "./NavigationSidebarContext";

export const NavigationSidebarOverlay = () => {
  const { isOpen, setIsOpen } = useContext(NavigationSidebarContext);
  return (
    <div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-40"
        />
      )}
    </div>
  );
};
