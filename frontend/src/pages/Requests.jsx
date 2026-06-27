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

import IncidentCard from "../components/IncidentCard";
import DashboardSummary from "../components/DashboardSummary";

function Requests() {

  const [requests, setRequests] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const requestData = await getRequests();
      const resourceData = await getResources();

      setRequests(requestData);
      setResources(resourceData);

    } catch (error) {

      console.error(error);

    }

  };

  const handleStatusUpdate = async (
    requestId,
    status
  ) => {

    try {

      await updateRequestStatus(
        requestId,
        status
      );

      loadData();

    } catch (error) {

      console.error(error);

    }

  };

  const handleAssign = async (
    requestId
  ) => {

    const resourceId =
      selectedResources[requestId];

    if (!resourceId) {

      alert("Please select a resource.");

      return;

    }

    try {

      await createAssignment(
        requestId,
        parseInt(resourceId)
      );

      alert(
        "Resource assigned successfully."
      );

      loadData();

    } catch (error) {

      console.error(error);

      alert("Assignment failed.");

    }

  };

  return (

    <div className="container py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            🚨 RescueSphere Command Center

          </h2>

          <p className="text-muted mb-0">

            AI Powered Emergency Monitoring & Dispatch

          </p>

        </div>

        <span className="badge bg-dark fs-6 p-3">

          {requests.length} Active Incident(s)

        </span>

      </div>

      {/* Dashboard Summary */}

      <DashboardSummary
        requests={requests}
        resources={resources}
      />

      {/* Incident Cards */}

      <div className="mt-4">

        {requests.length === 0 ? (

          <div className="alert alert-info">

            No emergency incidents found.

          </div>

        ) : (

          requests.map((request) => (

            <IncidentCard

              key={request.id}

              request={request}

              resources={resources}

              selectedResources={
                selectedResources
              }

              setSelectedResources={
                setSelectedResources
              }

              handleAssign={
                handleAssign
              }

              handleStatusUpdate={
                handleStatusUpdate
              }

            />

          ))

        )}

      </div>

    </div>

  );

}

export default Requests;