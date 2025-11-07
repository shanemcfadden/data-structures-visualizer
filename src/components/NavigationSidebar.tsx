import { Margin } from "../components/Margin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState, type FormEventHandler } from "react";
import { joinClassNames } from "../util";
import { useRouter } from "next/router";
import Link from "next/link";
import { NAVIGATION_LINKS } from "../constants";

export const NavigationSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const onClick: FormEventHandler<HTMLButtonElement | HTMLDivElement> =
    useCallback((e) => {
      e.preventDefault();
      setIsOpen((previous) => !previous);
    }, []);

  return (
    <div>
      <div className="fixed left-0 top-0 p-4 mx-auto w-content text-xl">
        <button className="cursor-pointer" onClick={onClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {isOpen && (
        <div onClick={onClick} className="fixed inset-0 bg-black opacity-25" />
      )}
      <nav
        className={joinClassNames(
          "fixed left-0 top-0 bg-gray-800 h-full px-4 transition-transform duration-300 w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Margin>
          <div className="font-bold text-center">Data Structures</div>
        </Margin>
        <ul>
          {NAVIGATION_LINKS.map(({ href, label }) => (
            <NavigationLink key={href} href={href} label={label} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

interface NavigationLinkProps {
  href: string;
  label: string;
}
const NavigationLink = ({ href, label }: NavigationLinkProps) => {
  return (
    <Link href={href}>
      <li className="p-2 hover:bg-gray-600 transition-colors rounded">
        {label}
      </li>
    </Link>
  );
};
