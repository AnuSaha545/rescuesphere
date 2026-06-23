import { useEffect, useState } from "react";
import { getResources } from "../services/api";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
    } catch (error) {
      console.error("Error loading resources:", error);
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return "secondary";

    switch (status.toLowerCase()) {
      case "available":
        return "success";

      case "busy":
        return "danger";

      case "assigned":
        return "warning";

      default:
        return "secondary";
    }
  };

  return (
    <div>
      <h2 className="mb-4">Available Resources</h2>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Resources</h5>
              <h2>{resources.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Available</h5>
              <h2>
                {
                  resources.filter(
                    (r) =>
                      r.status?.toLowerCase() ===
                      "available"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Busy</h5>
              <h2>
                {
                  resources.filter(
                    (r) =>
                      r.status?.toLowerCase() ===
                      "busy"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      {resources.length === 0 ? (
        <div className="alert alert-info">
          No resources found.
        </div>
      ) : (
        resources.map((resource) => (
          <div
            key={resource.id}
            className="card shadow mb-3"
          >
            <div className="card-body">

              <h5>{resource.name}</h5>

              <p>
                <strong>Resource Type:</strong>{" "}
                {resource.resource_type}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge bg-${getStatusBadge(
                    resource.status
                  )}`}
                >
                  {resource.status}
                </span>
              </p>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Resources;