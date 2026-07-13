import type { JSX } from "react";
import { Margin } from "../../components/Margin";
import { toRepositoryFilePath, toWikiUrl } from "../../util";
import { Link } from "../../components/Link";

export interface DataStructureDashboardProps {
  Properties?: (props: { collapseTopMargin?: boolean }) => JSX.Element;
  Methods: (props: { collapseTopMargin?: boolean }) => JSX.Element;
  modelPath: string;
  wikiSlug: string;
}

export const DataStructureDashboard = ({
  Methods,
  modelPath,
  Properties,
  wikiSlug,
}: DataStructureDashboardProps) => {
  return (
    <Margin>
      <div className="sm:hidden">
        {Properties && <Properties />}
        <Methods />
      </div>
      <div className="hidden sm:grid sm:grid-cols-2">
        {Properties && <Properties collapseTopMargin />}
        <Methods collapseTopMargin />
      </div>
      <div className="flex items-center justify-between">
        <Link external href={toRepositoryFilePath(modelPath)}>
          Source Code
        </Link>
        <Link external href={toWikiUrl(wikiSlug)}>
          Wiki
        </Link>
      </div>
    </Margin>
  );
};
