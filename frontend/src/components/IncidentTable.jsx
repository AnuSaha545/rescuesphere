import { useMemo, useState } from "react";

import IncidentRow from "./IncidentRow";

function IncidentTable({
  requests,
  handleStatusUpdate,
  onView
}) {

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");

  const filteredRequests = useMemo(() => {

    return requests.filter((request) => {

      const matchesSearch =
        request.message
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "all" ||
        request.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? request.status !== "resolved"
          : request.status === statusFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );

    });

  }, [
    requests,
    search,
    priorityFilter,
    statusFilter
  ]);

  return (

    <div className="card shadow-sm border-0">

      <div className="card-header bg-white">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h4 className="mb-0">

            🚨 Active Emergency Incidents

          </h4>

          <span className="badge bg-danger">

            {filteredRequests.length} Active

          </span>

        </div>

        <div className="row g-2">

          <div className="col-md-5">

            <input
              className="form-control"
              placeholder="🔍 Search incident..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-3">

            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >

              <option value="all">
                All Priorities
              </option>

              <option value="critical">
                Critical
              </option>

              <option value="high">
                High
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="low">
                Low
              </option>

            </select>

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="active">
                Active Incidents
              </option>

              <option value="all">
                All Incidents
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="assigned">
                Assigned
              </option>

              <option value="waiting_for_resource">
                Waiting
              </option>

              <option value="resolved">
                Resolved
              </option>

            </select>

          </div>

        </div>

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

              <th>Type</th>

              <th>Incident</th>

              <th>Recommended Team</th>

              <th>Status</th>

              <th>Reported</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredRequests.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-4 text-muted"
                >

                  🎉 No incidents found.

                </td>

              </tr>

            ) : (

              filteredRequests.map((request) => (

                <IncidentRow

                  key={request.id}

                  request={request}

                  handleStatusUpdate={
                    handleStatusUpdate
                  }

                  onView={onView}

                />

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default IncidentTable;