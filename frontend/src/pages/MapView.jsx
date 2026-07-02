import { useEffect, useMemo, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import FitMapBounds from "../components/FitMapBounds";
import UserLocation from "../components/UserLocation";

import { resourceIcons } from "../utils/mapIcons";

import {
  getRequests,
  getResources,
  getAssignments
} from "../services/api";


import "leaflet/dist/leaflet.css";

const incidentIcons = {

  critical: new L.Icon({

    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [30, 45],

    iconAnchor: [15, 45]

  }),

  high: new L.Icon({

    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [30, 45],

    iconAnchor: [15, 45]

  }),

  medium: new L.Icon({

    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [30, 45],

    iconAnchor: [15, 45]

  }),

  low: new L.Icon({

    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [30, 45],

    iconAnchor: [15, 45]

  })

};

function MapView() {

  const [requests, setRequests] = useState([]);
  const [resources, setResources] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const loadData = async () => {

    try {

      const incidents = await getRequests();
      const teams = await getResources();
      const assigned = await getAssignments();

      setRequests(incidents);
      setResources(teams);
      setAssignments(assigned);

    }

    catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadData();

    const interval = setInterval(() => {

      loadData();

    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const center = useMemo(() => {

    const validRequest = requests.find(
      (request) => request.latitude != null && request.longitude != null
    );

    if (validRequest) {
      return [validRequest.latitude, validRequest.longitude];
    }

    return [19.0760, 72.8777];

  }, [requests]);

  return (

    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">

        <div>

          <h2>

            🗺 RescueSphere Live Map

          </h2>

          <p className="text-muted">

            Real-time Emergency Monitoring

          </p>

        </div>

        <span className="badge bg-dark fs-6">

          {requests.length} Incidents

        </span>

      </div>

      <div className="alert alert-light border">

        🔴 Critical &nbsp;&nbsp;

        🟠 High / Medium &nbsp;&nbsp;

        🟢 Low &nbsp;&nbsp;

        🚑 Resource Teams

      </div>

      <MapContainer
        center={center}
        zoom={12}
        style={{
          height: "700px",
          width: "100%",
          borderRadius: "12px"
        }}
>

  <TileLayer
    attribution="&copy; OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <UserLocation />

  <FitMapBounds
    requests={requests}
    resources={resources}
  />

  {requests
    .filter((request) => request.latitude != null && request.longitude != null)
    .map((request) => (
      <Marker
        key={request.id}
        position={[request.latitude, request.longitude]}
        icon={incidentIcons[request.priority] || incidentIcons.low}
      >
        <Popup>
          <h5>🚨 Incident #{request.id}</h5>
          <hr />
          <p>
            <strong>Message</strong>
            <br />
            {request.message}
          </p>
          <p>
            <strong>Category</strong>
            <br />
            {request.category}
          </p>
          <p>
            <strong>Priority</strong>
            <br />
            {request.priority}
          </p>
          <p>
            <strong>Status</strong>
            <br />
            {request.status}
          </p>
          <p>
            <strong>Recommended Team</strong>
            <br />
            {request.recommended_resource}
          </p>
        </Popup>
      </Marker>
    ))}

  {/* {resources
    .filter(
      (resource) => resource.latitude != null && resource.longitude != null
    )
    .map((resource) => (
      <Marker
        key={`resource-${resource.id}`}
        position={[resource.latitude, resource.longitude]}
        icon={resourceIcons[resource.resource_type] || resourceIcons.default}
      >
        <Popup>
          <h5>{resource.name}</h5>
          <hr />
          <p>
            <strong>Resource Type</strong>
            <br />
            {resource.resource_type}
          </p>
          <p>
            <strong>Status</strong>
            <br />
            {resource.status}
          </p>
          <p>
            <strong>Resource ID</strong>
            <br />
            #{resource.id}
          </p>
        </Popup>
      </Marker>
    ))} */}

</MapContainer>

    </div>

  );

}

export default MapView;