import {
  useCallback,
  type FormEventHandler,
  type ChangeEventHandler,
  useState,
  memo,
  type HTMLAttributes,
} from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

export type ActionProps = {
  disabled?: boolean;
  input?: boolean;
  inputMode?: HTMLAttributes<string>["inputMode"];
  inputPlaceholder?: string;
  inputPattern?: RegExp;
  label: string;
  onButtonClick: (input?: string) => void;
};

export const Action = memo(
  ({
    disabled,
    input = false,
    inputMode,
    inputPattern = /^.*$/,
    inputPlaceholder,
    label,
    onButtonClick: onButtonClickRaw,
  }: ActionProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        e.preventDefault();

        const { value } = e.target;
        if (value.match(inputPattern)) {
          setInputValue(e.target.value);
        }
      },
      [inputPattern],
    );

    const onButtonClick: FormEventHandler<
      HTMLButtonElement | HTMLInputElement
    > = useCallback(
      (e) => {
        e.preventDefault();
        onButtonClickRaw(inputValue);
        setInputValue("");
      },
      [inputValue, onButtonClickRaw],
    );

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        if (e.key === "Enter") {
          onButtonClick(e);
        }
      },
      [onButtonClick],
    );

    return (
      <div className="flex justify-between">
        {input && (
          <div className="mr-4">
            <TextInput
              disabled={disabled}
              inputMode={inputMode}
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
          </div>
        )}
        <Button disabled={disabled} onSubmit={onButtonClick}>
          {label}
        </Button>
      </div>
    );
  },
);
