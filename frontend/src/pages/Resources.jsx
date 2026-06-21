import { useEffect, useState } from "react";
import { getResources } from "../services/api";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    const data = await getResources();
    setResources(data);
  };

  return (
    <div>
      <h2 className="mb-4">Available Resources</h2>

      {resources.map((resource) => (
        <div
          key={resource.id}
          className="card shadow mb-3"
        >
          <div className="card-body">
            <h5>{resource.name}</h5>

            <p>
              <strong>Type:</strong> {resource.resource_type}
            </p>

            <p>
              <strong>Status:</strong> {resource.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Resources;