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
import { Margin } from "./Margin";

export type ActionProps = {
  ["data-cy"]: string;
  disabled?: boolean;
  input?: boolean;
  inputMode?: HTMLAttributes<string>["inputMode"];
  inputPlaceholder?: string;
  inputPattern?: RegExp;
  label: string;
  onButtonClick: (input?: string) => void;
  result?: {
    label: string;
    value?: string;
  };
};

export const Action = memo(
  ({
    "data-cy": dataCy,
    disabled,
    input = false,
    inputMode,
    inputPattern = /^.*$/,
    inputPlaceholder,
    label,
    onButtonClick: onButtonClickRaw,
    result,
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

    const isInputEmpty = input && inputValue.length === 0;

    return (
      <div>
        <div className="flex justify-between items-center">
          {input && (
            <div className="mr-4">
              <TextInput
                data-cy={`${dataCy}-input`}
                disabled={disabled}
                inputMode={inputMode}
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
            </div>
          )}
          <Button
            data-cy={`${dataCy}-button`}
            disabled={disabled || isInputEmpty}
            onSubmit={onButtonClick}
          >
            {label}
          </Button>
          {!input && result?.value && (
            <div data-cy={`${dataCy}-result`}>
              {result.label}: {result.value}
            </div>
          )}
        </div>
        {input && result && (
          <Margin weight="small" collapseBottom>
            {result.value ? (
              <div data-cy={`${dataCy}-result`}>
                {result.label}: {result.value}
              </div>
            ) : (
              <div>&nbsp;</div>
            )}
          </Margin>
        )}
      </div>
    );
  },
);
Action.displayName = "Action";
