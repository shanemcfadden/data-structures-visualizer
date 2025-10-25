import {
  useCallback,
  type FormEventHandler,
  type ChangeEventHandler,
  useState,
  memo,
} from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

export type ActionProps = {
  input?: boolean;
  inputPlaceholder?: string;
  inputPattern?: RegExp;
  label: string;
  onButtonClick: (input?: string) => void;
};

export const Action = memo(
  ({
    input = false,
    inputPattern = /^.*$/,
    inputPlaceholder,
    label,
    onButtonClick: onButtonClickRaw,
  }: ActionProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
      e.preventDefault();

      const { value } = e.target;
      if (value.match(inputPattern)) {
        setInputValue(e.target.value);
      }
    }, []);

    const onButtonClick: FormEventHandler<
      HTMLButtonElement | HTMLInputElement
    > = useCallback(
      (e) => {
        e.preventDefault();
        onButtonClickRaw(inputValue);
        setInputValue("");
      },
      [inputValue],
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
          <TextInput
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        )}
        <Button onSubmit={onButtonClick}>{label}</Button>
      </div>
    );
  },
);
