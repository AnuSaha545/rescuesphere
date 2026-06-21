import { useEffect, useState } from "react";
import { getRequests } from "../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const data = await getRequests();
    setRequests(data);
  };

  return (
    <div>
      <h2 className="mb-4">Emergency Requests</h2>

      {requests.map((request) => (
        <div
          key={request.id}
          className="card shadow mb-3"
        >
          <div className="card-body">

            <h5>{request.message}</h5>

            <p>
              <strong>Category:</strong>{" "}
              {request.category || "Not Classified"}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {request.priority || "Unknown"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {request.status}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Requests;