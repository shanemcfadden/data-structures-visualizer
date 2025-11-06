import type { PropsWithChildren } from "react";
import NextJsLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type LinkProps = PropsWithChildren<{
  external?: boolean;
  to: string;
}>;

export const Link = ({ children, external = false, to }: LinkProps) =>
  external ? (
    <a
      className="text-blue-400 hover:underline"
      href={to}
      target="_blank"
      rel="noreferrer"
    >
      {children}&nbsp;
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </a>
  ) : (
    <NextJsLink className="text-blue-400 hover:underline" href={to}>
      {children}
    </NextJsLink>
  );
