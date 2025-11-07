import { useContext } from "react";
import { joinClassNames } from "../../util";
import { NAVIGATION_LINKS } from "../../constants";
import { Heading } from "../Heading";
import { NavigationSidebarLink } from "./NavigationSidbarLink";
import { NavigationSidebarContext } from "./NavigationSidebarContext";

export const NavigationSidebar = () => {
  const { isOpen, setIsOpen } = useContext(NavigationSidebarContext);

  return (
    <div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-25"
        />
      )}
      <nav
        className={joinClassNames(
          "fixed left-0 top-0 bg-gray-800 h-full px-4 transition-transform duration-300 w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Heading level={3}>Data Structures</Heading>
        <ul>
          {NAVIGATION_LINKS.map(({ href, label }) => (
            <NavigationSidebarLink key={href} href={href} label={label} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
