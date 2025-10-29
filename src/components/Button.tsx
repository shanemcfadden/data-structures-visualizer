import type { FormEventHandler, PropsWithChildren } from "react";
import { joinClassNames } from "../util";

export type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onSubmit: FormEventHandler<HTMLButtonElement>;
}>;

export const Button = ({ children, disabled, onSubmit }: ButtonProps) => (
  <button
    className={joinClassNames(
      "bg-blue-700",
      "border",
      "border-blue-700",
      "cursor-pointer",
      "disabled:bg-blue-300",
      "disabled:border-blue-300",
      "disabled:cursor-not-allowed",
      "disabled:hover:bg-blue-300",
      "hover:bg-blue-800",
      "hover:border-blue-800",
      "py-2",
      "px-4",
      "rounded",
      "text-white",
    )}
    disabled={disabled}
    onClick={onSubmit}
    type="button"
  >
    {children}
  </button>
);
