import * as React from "react";

export type MarginProps = {
  collapseBottom?: boolean;
  collapseTop?: boolean;
  weight?: MarginWeight;
};

export const Margin = React.memo(
  ({
    children,
    collapseBottom = false,
    collapseTop = false,
    weight = "medium",
  }: React.PropsWithChildren<MarginProps>) => {
    const className = React.useMemo(() => {
      if (collapseTop && collapseBottom) {
        return "";
      }
      if (collapseTop) {
        return MARGIN_WEIGHT_TO_COLLAPSE_TOP_CLASS[weight];
      }
      if (collapseBottom) {
        return MARGIN_WEIGHT_TO_COLLAPSE_BOTTOM_CLASS[weight];
      }
      return MARGIN_WEIGHT_TO_CLASS[weight];
    }, [collapseTop, collapseBottom, weight]);

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

const MARGIN_WEIGHT_TO_COLLAPSE_BOTTOM_CLASS: Record<MarginWeight, string> = {
  "extra-small": "mt-1",
  small: "mt-2",
  medium: "mt-4",
  large: "mt-6",
};
