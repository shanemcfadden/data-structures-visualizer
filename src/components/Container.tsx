import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="min-w-xs w-max mx-auto">{children}</div>
);
