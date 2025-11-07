import { Link } from "../components/Link";
import { Heading } from "../components/Heading";
import { ListItem, UnorderedList } from "../components/List";
import { NAVIGATION_LINKS } from "../constants";

export const Navigation = () => (
  <div>
    <Heading level={2}>Data Structures</Heading>
    <UnorderedList>
      {NAVIGATION_LINKS.map(({ href, label }) => (
        <ListItem key={href}>
          <Link href={href}>{label}</Link>
        </ListItem>
      ))}
    </UnorderedList>
  </div>
);
