import { useEffect, useState } from "react";
import {
  getRequests,
  updateRequestStatus
} from "../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };

  const handleStatusUpdate = async (
    requestId,
    newStatus
  ) => {
    try {
      await updateRequestStatus(
        requestId,
        newStatus
      );

      loadRequests();
    } catch (error) {
      console.error(
        "Error updating status:",
        error
      );
    }
  };

  return (
    <div>
      <h2 className="mb-4">
        Emergency Requests
      </h2>

      {requests.length === 0 ? (
        <div className="alert alert-info">
          No requests found.
        </div>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="card shadow mb-3"
          >
            <div className="card-body">

              <h5>{request.message}</h5>

              <p>
                <strong>Category:</strong>{" "}
                {request.category ||
                  "Not Classified"}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {request.priority ||
                  "Unknown"}
              </p>

              <p>
                <strong>
                  Recommended Resource:
                </strong>{" "}
                {request.recommended_resource ||
                  "Not Assigned"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {request.status ||
                  "Pending"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {request.latitude},
                {" "}
                {request.longitude}
              </p>

              <div className="mt-3">

                <label className="form-label">
                  Update Status
                </label>

                <select
                  className="form-select"
                  value={
                    request.status ||
                    "pending"
                  }
                  onChange={(e) =>
                    handleStatusUpdate(
                      request.id,
                      e.target.value
                    )
                  }
                >
                  <option value="pending">
                    Pending
                  </option>

                  <option value="assigned">
                    Assigned
                  </option>

                  <option value="in_progress">
                    In Progress
                  </option>

                  <option value="resolved">
                    Resolved
                  </option>
                </select>

              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Requests;