import Link from "next/link";
import { Container } from "./Container";
import { NavigationSidebarHamburger } from "./NavigationSidebar/NavigationSidebarHamburger";
import { Heading } from "./Heading";
import type { PropsWithChildren } from "react";

export const Header = () => (
  <header className="bg-gray-800">
    <Container>
      <div className="flex justify-between">
        <HeaderButtonContainer>
          <NavigationSidebarHamburger />
        </HeaderButtonContainer>
        <Link href="/">
          <Heading level={1} textCenter>
            Data Structures Visualizer
          </Heading>
        </Link>
        <HeaderButtonContainer />
      </div>
    </Container>
  </header>
);

const HeaderButtonContainer = ({ children }: PropsWithChildren) => (
  <div className="text-xl w-12 flex justify-center items-center">
    {children}
  </div>
);
