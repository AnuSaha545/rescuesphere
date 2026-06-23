import { useEffect, useState } from "react";
import {
  getDashboard,
  getRequests
} from "../services/api";

import DashboardChart from "../components/DashboardChart";

function Dashboard() {

  const [stats, setStats] = useState({
    total_requests: 0,
    critical_requests: 0,
    medical_requests: 0,
    food_requests: 0,
    water_requests: 0,
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const dashboardData =
        await getDashboard();

      const requestData =
        await getRequests();

      setStats(dashboardData);

      setRequests(requestData);

    } catch (error) {
      console.error(
        "Error loading dashboard:",
        error
      );
    }
  };

  return (
    <div>

      <h2 className="mb-4">
        RescueSphere Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Total Requests</h6>
              <h2>
                {stats.total_requests}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Critical Requests</h6>
              <h2>
                {stats.critical_requests}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Medical Requests</h6>
              <h2>
                {stats.medical_requests}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Food Requests</h6>
              <h2>
                {stats.food_requests}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Water Requests</h6>
              <h2>
                {stats.water_requests}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-4 d-flex justify-content-center">

        <DashboardChart
          total={stats.total_requests}
          critical={stats.critical_requests}
          medical={stats.medical_requests}
        />

      </div>

      <h3 className="mt-5">
        Recent Requests
      </h3>

      <div className="card shadow">

        <div className="card-body">

          {requests.length === 0 ? (

            <p>No requests found.</p>

          ) : (

            requests
              .slice(0, 5)
              .map((request) => (

                <div
                  key={request.id}
                  className="mb-3"
                >

                  <strong>
                    {request.message}
                  </strong>

                  <br />

                  <span>
                    Category:
                    {" "}
                    {request.category}
                  </span>

                  <br />

                  <span>
                    Priority:
                    {" "}
                    {request.priority}
                  </span>

                  <br />

                  <span>
                    Status:
                    {" "}
                    {request.status}
                  </span>

                  <hr />

                </div>

              ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;