import { useCallback, useContext, type FormEventHandler } from "react";
import { NavigationSidebarContext } from "./NavigationSidebarContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavigationSidebarHamburger = () => {
  const { setIsOpen } = useContext(NavigationSidebarContext);

  const onClick: FormEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      setIsOpen((previous) => !previous);
    },
    [setIsOpen],
  );

  return (
    <button className="cursor-pointer p-2" onClick={onClick}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};
