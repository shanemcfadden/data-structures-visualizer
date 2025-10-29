import type { JSX } from "react";
import * as React from "react";
import { Margin, type MarginWeight } from "./Margin";
import { joinClassNames } from "../util";

type HeadingProps = React.PropsWithChildren<{
  collapseTopMargin?: boolean;
  level: HeadingLevel;
  textCenter?: boolean;
}>;

export const Heading: React.FC<HeadingProps> = React.memo(
  ({ children, collapseTopMargin, level, textCenter }) => {
    const Tag = HEADING_LEVEL_TO_TAG[level];
    const marginWeight: MarginWeight = React.useMemo(() => {
      switch (level) {
        case 1:
          return "large";
        case 2:
          return "medium";
        default:
          return "small";
      }
    }, [level]);

    return (
      <Margin collapseTop={collapseTopMargin} weight={marginWeight}>
        <Tag
          className={joinClassNames(
            textCenter ? "text-center" : "",
            HEADING_LEVEL_TO_CLASS[level],
            "font-bold",
          )}
        >
          {children}
        </Tag>
      </Margin>
    );
  },
);

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_LEVEL_TO_TAG: Record<HeadingLevel, keyof JSX.IntrinsicElements> =
  {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };

const HEADING_LEVEL_TO_CLASS: Record<HeadingLevel, string> = {
  1: "text-3xl",
  2: "text-2xl",
  3: "text-lg",
  4: "text-md",
  5: "text-sm",
  6: "text-xs",
};
