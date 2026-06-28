import { useEffect, useState } from "react";

import { getRequests } from "../services/api";

import PriorityBadge from "../components/PriorityBadge";
import StatusBadge from "../components/StatusBadge";
import IncidentModal from "../components/IncidentModal";

function History() {

  const [requests, setRequests] = useState([]);

  const [selectedIncident, setSelectedIncident] =
    useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const data = await getRequests();

      const resolved = data.filter(

        (request) =>
          request.status === "resolved"

      );

      setRequests(resolved);

    }

    catch (error) {

      console.error(error);

    }

  };

  const filteredRequests = requests.filter(

    (request) =>

      request.message
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      request.category
        .toLowerCase()
        .includes(search.toLowerCase())

  );

  return (

    <div className="container">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>

            📁 Incident History

          </h2>

          <p className="text-muted">

            Previously resolved incidents

          </p>

        </div>

        <span className="badge bg-success fs-6">

          {filteredRequests.length} Resolved

        </span>

      </div>

      <div className="card shadow-sm border-0">

        <div className="card-header bg-white">

          <input

            className="form-control"

            placeholder="🔍 Search history..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

          />

        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead
              className="text-white"
              style={{
                backgroundColor: "#0F172A"
              }}
            >

              <tr>

                <th>ID</th>

                <th>Priority</th>

                <th>Category</th>

                <th>Incident</th>

                <th>Status</th>

                <th>Resolved Time</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {filteredRequests.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-4 text-muted"
                  >

                    No resolved incidents.

                  </td>

                </tr>

              ) : (

                filteredRequests.map((request) => (

                  <tr key={request.id}>

                    <td>

                      #{request.id}

                    </td>

                    <td>

                      <PriorityBadge
                        priority={request.priority}
                      />

                    </td>

                    <td>

                      {request.category}

                    </td>

                    <td>

                      <div
                        style={{
                          maxWidth: "320px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis"
                        }}
                      >

                        {request.message}

                      </div>

                    </td>

                    <td>

                      <StatusBadge
                        status={request.status}
                      />

                    </td>

                    <td>

                      {request.created_at
                        ? new Date(
                            request.created_at
                          ).toLocaleString()
                        : "-"}

                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          setSelectedIncident(request)
                        }
                      >

                        View

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      <IncidentModal

        request={selectedIncident}

        onClose={() =>
          setSelectedIncident(null)
        }

      />

    </div>

  );

}

export default History;