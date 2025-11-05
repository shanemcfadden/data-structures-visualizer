import type { PropsWithChildren } from "react";

export const UnorderedList = ({ children }: PropsWithChildren) => (
  <ul className="list-disc list-inside">{children}</ul>
);

export const ListItem = ({ children }: PropsWithChildren) => (
  <li>{children}</li>
);
