import "../globals.css";
import type { AppProps } from "next/app";
import { Container } from "../components/Container";
import Head from "next/head";
import { NavigationSidebar } from "../components/NavigationSidebar";
import { Header } from "../components/Header";
import { NavigationSidebarContextProvider } from "../components/NavigationSidebar/NavigationSidebarContextProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}
