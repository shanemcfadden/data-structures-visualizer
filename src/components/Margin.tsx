import * as React from "react";

export type MarginProps = {
  collapseTop?: boolean;
  weight?: MarginWeight;
};

export const Margin = React.memo(
  ({
    children,
    collapseTop = false,
    weight = "medium",
  }: React.PropsWithChildren<MarginProps>) => {
    const className = React.useMemo(
      () =>
        collapseTop
          ? MARGIN_WEIGHT_TO_COLLAPSE_TOP_CLASS[weight]
          : MARGIN_WEIGHT_TO_CLASS[weight],

      [collapseTop, weight],
    );

    return <div className={className}>{children}</div>;
  },
);

export type MarginWeight = "extra-small" | "small" | "medium" | "large";

const MARGIN_WEIGHT_TO_CLASS: Record<MarginWeight, string> = {
  "extra-small": "my-1",
  small: "my-2",
  medium: "my-4",
  large: "my-6",
};

const MARGIN_WEIGHT_TO_COLLAPSE_TOP_CLASS: Record<MarginWeight, string> = {
  "extra-small": "mb-1",
  small: "mb-2",
  medium: "mb-4",
  large: "mb-6",
};
