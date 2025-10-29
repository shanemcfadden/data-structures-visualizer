import { Heading } from "../../components/Heading";
import { Link } from "../../components/Link";
import { toRepositoryFilePath } from "../../util";

export const LinkedListSourceCodeLink = () => (
  <Heading level={3} textCenter>
    <Link to={toRepositoryFilePath("src/models/linked-list.ts")}>
      Source Code
    </Link>
  </Heading>
);
