import type { PropsWithChildren } from "react";

export const UnorderedList = ({ children }: PropsWithChildren) => {
  return <ul className="list-disc list-inside">{children}</ul>;
};

export const ListItem = ({ children }: PropsWithChildren) => {
  return <li>{children}</li>;
};
