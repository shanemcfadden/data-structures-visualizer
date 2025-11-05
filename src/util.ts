const REPOSITORY_URL =
  "https://github.com/shanemcfadden/data-structures-visualizer";
const GITHUB_FILE_VIEWER_PATH = "blob/main";

export const toRepositoryFilePath = (localFilePath: string) =>
  [REPOSITORY_URL, GITHUB_FILE_VIEWER_PATH, localFilePath].join("/");

const WIKI_BASE_URL = "https://en.wikipedia.org/wiki";

export const toWikiUrl = (slug: string) => [WIKI_BASE_URL, slug].join("/");

export const joinClassNames = (...classes: string[]) => classes.join(" ");

export const nullableNumberToString = (number: number | null): string =>
  number === null ? "null" : number.toString();
