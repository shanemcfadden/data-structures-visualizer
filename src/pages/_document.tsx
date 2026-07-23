import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const prependBasePath = (path: string) =>
    (process.env.NEXT_PUBLIC_BASE_PATH || "") + path;

  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={prependBasePath("/apple-touch-icon.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={prependBasePath("/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={prependBasePath("/favicon-16x16.png")}
        />
        <link rel="manifest" href={prependBasePath("/site.webmanifest")} />
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
