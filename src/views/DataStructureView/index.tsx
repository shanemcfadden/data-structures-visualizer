import { Heading } from "../../components/Heading";
import type { JSX, PropsWithChildren } from "react";
import { Margin } from "../../components/Margin";
import {
  DataStructureDashboard,
  type DataStructureDashboardProps,
} from "./DataStructureDashboard";

interface DataStructureViewProps extends DataStructureDashboardProps {
  ContextProvider: (props: PropsWithChildren) => JSX.Element;
  heading: string;
  Viewer: () => JSX.Element;
}

export const DataStructureView = ({
  ContextProvider,
  heading,
  Methods,
  modelPath,
  Properties,
  Viewer,
  wikiSlug,
}: DataStructureViewProps) => (
  <ContextProvider>
    <Heading level={2} textCenter>
      {heading}
    </Heading>

    <div className="hidden sm:block">
      <DataStructureDashboard
        Methods={Methods}
        modelPath={modelPath}
        Properties={Properties}
        wikiSlug={wikiSlug}
      />
    </div>

    {/** 
        Declaring the Svg Viewer twice (once hidden and once not) breaks Svg Def references.

        For now it can be declared just once. Will revisit later if necessary.
    */}
    <Margin>
      <Viewer />
    </Margin>

    <div className="sm:hidden">
      <DataStructureDashboard
        Properties={Properties}
        Methods={Methods}
        modelPath={modelPath}
        wikiSlug={wikiSlug}
      />
    </div>
  </ContextProvider>
);
