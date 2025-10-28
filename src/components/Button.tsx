import type { FormEventHandler, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{
  onSubmit: FormEventHandler<HTMLButtonElement>;
}>;

export const Button = ({ children, onSubmit }: ButtonProps) => (
  <button
    className="bg-blue-700 border border-blue-700 text-white py-2 px-4 rounded cursor-pointer"
    onClick={onSubmit}
    type="button"
  >
    {children}
  </button>
);
