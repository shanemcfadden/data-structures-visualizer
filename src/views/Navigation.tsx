import { Link } from "../components/Link";
import { Heading } from "../components/Heading";
import { ListItem, UnorderedList } from "../components/List";

export const Navigation = () => (
  <div>
    <Heading level={2}>Data Structures</Heading>
    <UnorderedList>
      <ListItem>
        <Link href="/linked-list">Linked List</Link>
      </ListItem>
      <ListItem>
        <Link href="/queue">Queue</Link>
      </ListItem>
      <ListItem>
        <Link href="/stack">Stack</Link>
      </ListItem>
    </UnorderedList>
  </div>
);
