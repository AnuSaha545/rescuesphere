import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <span className="navbar-brand">
          RescueSphere
        </span>

        <div>
          <Link className="btn btn-outline-light mx-2" to="/">
            Dashboard
          </Link>

          <Link className="btn btn-outline-light mx-2" to="/submit">
            Submit
          </Link>

          <Link className="btn btn-outline-light mx-2" to="/requests">
            Requests
          </Link>

          <Link className="btn btn-outline-light mx-2" to="/resources">
            Resources
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;