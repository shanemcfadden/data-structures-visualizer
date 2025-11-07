import Head from "next/head";
import { Navigation } from "../views/Navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Data Structures Visualizer</title>
      </Head>
      <Navigation />
    </>
  );
}
