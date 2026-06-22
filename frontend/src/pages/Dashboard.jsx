import { useEffect, useState } from "react";
import { getRequests } from "../services/api";
import DashboardChart from "../components/DashboardChart";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    medical: 0,
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getRequests();

      setRequests(data);

      const critical = data.filter(
        (r) => r.priority?.toLowerCase() === "critical"
      ).length;

      const medical = data.filter(
        (r) => r.category?.toLowerCase() === "medical"
      ).length;

      setStats({
        total: data.length,
        critical,
        medical,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Requests</h5>
              <h1>{stats.total}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Critical Requests</h5>
              <h1>{stats.critical}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Medical Requests</h5>
              <h1>{stats.medical}</h1>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-5 mb-3">System Overview</h3>

      <div className="card shadow">
        <div className="card-body">
          <p>
            <strong>Total Emergency Requests:</strong> {stats.total}
          </p>

          <p>
            <strong>Critical Cases:</strong> {stats.critical}
          </p>

          <p>
            <strong>Medical Cases:</strong> {stats.medical}
          </p>
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-center">
        <DashboardChart
          total={stats.total}
          critical={stats.critical}
          medical={stats.medical}
        />
      </div>

      <h3 className="mt-5">Recent Requests</h3>

      <div className="card shadow">
        <div className="card-body">
          {requests.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            requests.slice(0, 5).map((request) => (
              <div key={request.id} className="mb-3">
                <strong>{request.message}</strong>

                <br />

                <span>
                  <strong>Category:</strong> {request.category}
                </span>

                <br />

                <span>
                  <strong>Priority:</strong> {request.priority}
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