/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  output: "export",
  distDir: `./dist${process.env.NEXT_PUBLIC_BASE_PATH ? `/${process.env.NEXT_PUBLIC_BASE_PATH}` : ""}`,
};

export default nextConfig;
