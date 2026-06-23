import {
  useEffect,
  useState
} from "react";

import {
  getRequests,
  getResources,
  updateRequestStatus,
  createAssignment
} from "../services/api";

function Requests() {

  const [requests, setRequests] =
    useState([]);

  const [resources, setResources] =
    useState([]);

  const [selectedResources,
    setSelectedResources] =
    useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const requestData =
        await getRequests();

      const resourceData =
        await getResources();

      setRequests(requestData);
      setResources(resourceData);

    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate =
    async (
      requestId,
      status
    ) => {

      await updateRequestStatus(
        requestId,
        status
      );

      loadData();
    };

  const handleAssign =
    async (
      requestId
    ) => {

      const resourceId =
        selectedResources[
          requestId
        ];

      if (!resourceId) {
        alert(
          "Please select a resource"
        );
        return;
      }

      try {

        await createAssignment(
          requestId,
          parseInt(resourceId)
        );

        alert(
          "Resource assigned successfully"
        );

        loadData();

      } catch (error) {

        console.error(error);

        alert(
          "Assignment failed"
        );
      }
    };

  return (
    <div>

      <h2 className="mb-4">
        Emergency Requests
      </h2>

      {requests.map((request) => (

        <div
          key={request.id}
          className="card shadow mb-3"
        >

          <div className="card-body">

            <h5>
              {request.message}
            </h5>

            <p>
              <strong>
                Category:
              </strong>{" "}
              {request.category}
            </p>

            <p>
              <strong>
                Priority:
              </strong>{" "}
              {request.priority}
            </p>

            <p>
              <strong>
                Recommended:
              </strong>{" "}
              {
                request.recommended_resource
              }
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {request.status}
            </p>

            <hr />

            <label className="form-label">
              Assign Resource
            </label>

            <select
              className="form-select mb-2"
              value={
                selectedResources[
                  request.id
                ] || ""
              }
              onChange={(e) =>
                setSelectedResources({
                  ...selectedResources,
                  [request.id]:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Resource
              </option>

              {resources
                .filter(
                  (resource) =>
                    resource.status ===
                    "available"
                )
                .map((resource) => (

                  <option
                    key={resource.id}
                    value={resource.id}
                  >

                    {resource.name}

                  </option>

                ))}

            </select>

            <button
              className="btn btn-primary mb-3"
              onClick={() =>
                handleAssign(
                  request.id
                )
              }
            >
              Assign Resource
            </button>

            <div>

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

      ))}

    </div>
  );
}

export default Requests;