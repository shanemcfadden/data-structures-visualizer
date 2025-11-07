import "../globals.css";
import type { AppProps } from "next/app";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import Head from "next/head";
import Link from "next/link";
import { NavigationSidebar } from "../components/NavigationSidebar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavigationSidebar />
      <Container>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Link href="/">
          <Heading level={1} textCenter>
            Data Structures Visualizer
          </Heading>
        </Link>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}
