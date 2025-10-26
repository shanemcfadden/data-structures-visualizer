import type { ChangeEventHandler, KeyboardEventHandler } from "react";

export type TextInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
};

export const TextInput = ({
  onChange,
  onKeyDown,
  placeholder,
  value,
}: TextInputProps) => (
  <input
    className="border border-gray rounded p-2"
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    type="text"
    value={value}
  />
);
