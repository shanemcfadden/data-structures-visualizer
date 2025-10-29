import type {
  ChangeEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
} from "react";

export type TextInputProps = {
  disabled?: boolean;
  inputMode?: HTMLAttributes<string>["inputMode"];
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
};

export const TextInput = ({
  disabled,
  inputMode,
  onChange,
  onKeyDown,
  placeholder,
  value,
}: TextInputProps) => (
  <input
    className={[
      "bg-gray-800",
      "border",
      "border-gray-600",
      "disabled:bg-gray-600",
      "disabled:cursor-not-allowed",
      "p-2",
      "placeholder-gray-500",
      "rounded",
      "w-full",
    ].join(" ")}
    disabled={disabled}
    inputMode={inputMode}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    type="text"
    value={value}
  />
);
