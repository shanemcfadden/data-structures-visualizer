import { Link } from "../../components/Link";
import { toRepositoryFilePath } from "../../util";

export const LinkedListSourceCodeLink = () => (
  <Link to={toRepositoryFilePath("src/models/linked-list.ts")}>
    Source Code
  </Link>
);
