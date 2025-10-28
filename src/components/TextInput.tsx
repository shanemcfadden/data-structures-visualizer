import type {
  ChangeEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
} from "react";

export type TextInputProps = {
  inputMode?: HTMLAttributes<string>["inputMode"];
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
};

export const TextInput = ({
  inputMode,
  onChange,
  onKeyDown,
  placeholder,
  value,
}: TextInputProps) => (
  <input
    className="border border-gray rounded p-2 w-full"
    inputMode={inputMode}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    type="text"
    value={value}
  />
);
