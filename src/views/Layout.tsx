import { Link, Outlet } from "react-router";
import { Heading } from "../components/Heading";
import { Container } from "../components/Container";

export const Layout = () => (
  <Container>
    <Link to="/">
      <Heading level={1} textCenter>
        Data Structures Visualizer
      </Heading>
    </Link>
    <Outlet />
  </Container>
);
