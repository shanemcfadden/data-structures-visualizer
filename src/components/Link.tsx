import type { PropsWithChildren } from "react";
import NextJsLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type LinkProps = PropsWithChildren<{
  external?: boolean;
  href: string;
}>;

export const Link = ({ children, external = false, href }: LinkProps) =>
  external ? (
    <a
      className="text-blue-400 hover:underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}&nbsp;
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </a>
  ) : (
    <NextJsLink className="text-blue-400 hover:underline" href={href}>
      {children}
    </NextJsLink>
  );
