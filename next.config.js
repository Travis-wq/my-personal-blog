/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPagesSite = repositoryName.endsWith(".github.io");
const basePath =
  isGithubActions && repositoryName && !isUserOrOrgPagesSite
    ? `/${repositoryName}`
    : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
};

module.exports = nextConfig;
