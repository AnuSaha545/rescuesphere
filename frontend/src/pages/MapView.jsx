import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import { getRequests } from "../services/api";

import "leaflet/dist/leaflet.css";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function getMarkerIcon(priority) {

  if (!priority) {
    return greenIcon;
  }

  const p = priority.toLowerCase();

  if (p === "critical") {
    return redIcon;
  }

  if (
    p === "high" ||
    p === "medium"
  ) {
    return orangeIcon;
  }

  return greenIcon;
}

function MapView() {

  const [requests, setRequests] =
    useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data =
        await getRequests();

      setRequests(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h2 className="mb-3">
        Emergency Response Map
      </h2>

      <div className="alert alert-info">

        🔴 Critical &nbsp;&nbsp;
        🟠 High &nbsp;&nbsp;
        🟢 Normal

      </div>

      <MapContainer
        center={[19.0760, 72.8777]}
        zoom={11}
        style={{
          height: "650px",
          width: "100%"
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {requests.map((request) => (

          <Marker
            key={request.id}
            position={[
              request.latitude,
              request.longitude
            ]}
            icon={getMarkerIcon(
              request.priority
            )}
          >

            <Popup>

              <h6>
                Emergency Request
              </h6>

              <hr />

              <strong>
                Message:
              </strong>

              <br />

              {request.message}

              <br />
              <br />

              <strong>
                Category:
              </strong>{" "}
              {request.category}

              <br />

              <strong>
                Priority:
              </strong>{" "}
              {request.priority}

              <br />

              <strong>
                Status:
              </strong>{" "}
              {request.status}

              <br />

              <strong>
                Recommended:
              </strong>{" "}
              {
                request.recommended_resource
              }

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
}

export default MapView;