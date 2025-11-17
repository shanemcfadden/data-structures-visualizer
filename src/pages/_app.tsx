import "../globals.css";
import type { AppProps } from "next/app";
import { Container } from "../components/Container";
import Head from "next/head";
import { NavigationSidebar } from "../components/NavigationSidebar";
import { Header } from "../components/Header";
import { NavigationSidebarContextProvider } from "../components/NavigationSidebar/NavigationSidebarContextProvider";
import { StrictMode } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <div>
        <NavigationSidebarContextProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <NavigationSidebar />
          <Header />
          <Container>
            <main>
              <Component {...pageProps} />
            </main>
          </Container>
        </NavigationSidebarContextProvider>
      </div>
    </StrictMode>
  );
}
