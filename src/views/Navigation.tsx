import { Link } from "react-router";

export const Navigation = () => {
  return (
    <div>
      <div>
        <Link to="/linked-list">Linked List</Link>
      </div>
      <div>
        <Link to="/stack">Stack</Link>
      </div>
    </div>
  );
};
