const REPOSITORY_URL =
  "https://github.com/shanemcfadden/data-structures-visualizer";
const GITHUB_FILE_VIEWER_PATH = "blob/main";

export const toRepositoryFilePath = (localFilePath: string) =>
  [REPOSITORY_URL, GITHUB_FILE_VIEWER_PATH, localFilePath].join("/");

export const joinClassNames = (...classes: string[]) => classes.join(" ");
