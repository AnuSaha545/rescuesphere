import { useEffect, useState } from "react";
import { getRequests } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    medical: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const requests = await getRequests();

    const critical = requests.filter(
      (r) => r.priority?.toLowerCase() === "critical"
    ).length;

    const medical = requests.filter(
      (r) => r.category?.toLowerCase() === "medical"
    ).length;

    setStats({
      total: requests.length,
      critical,
      medical,
    });
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
    </div>
  );
}

export default Dashboard;