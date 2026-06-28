import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const menus = [

    {
      name: "Dashboard",
      path: "/"
    },

    {
      name: "Incidents",
      path: "/requests"
    },

    {
      name: "Resources",
      path: "/resources"
    },

    {
      name: "Map",
      path: "/map"
    },

    {
      name: "History",
      path: "/history"
    }

  ];

  return (

    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "#0F172A",
        boxShadow: "0 8px 25px rgba(0,0,0,.15)"
      }}
    >

      <div className="container-fluid">

        <span
          className="navbar-brand fw-bold text-white"
          style={{
            fontSize: "1.4rem"
          }}
        >
          🚨 RescueSphere
        </span>

        <div className="navbar-nav ms-auto">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`nav-link mx-2 fw-semibold ${
                location.pathname === menu.path
                  ? "text-warning"
                  : "text-white"
              }`}
            >
              {menu.name}
            </Link>

          ))}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;