import type { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type LinkProps = PropsWithChildren<{ to: string }>;

export const Link = ({ children, to }: LinkProps) => (
  <a
    className="text-blue-400 hover:underline"
    href={to}
    target="_blank"
    rel="noreferrer"
  >
    {children}
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
  </a>
);
