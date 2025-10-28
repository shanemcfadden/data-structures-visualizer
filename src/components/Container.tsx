import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="max-w-4xl mx-auto px-4">{children}</div>
);
