import { useEffect } from "react";

import { useMap } from "react-leaflet";

import L from "leaflet";

function FitMapBounds({
  requests,
  resources
}) {

  const map = useMap();

  useEffect(() => {

    const bounds = [];

    requests.forEach((request) => {

      if (
        request.latitude &&
        request.longitude
      ) {

        bounds.push([
          request.latitude,
          request.longitude
        ]);

      }

    });

    resources.forEach((resource) => {

      if (
        resource.latitude &&
        resource.longitude
      ) {

        bounds.push([
          resource.latitude,
          resource.longitude
        ]);

      }

    });

    if (bounds.length > 0) {

      map.fitBounds(

        L.latLngBounds(bounds),

        {
          padding: [60, 60]
        }

      );

    }

  }, [requests, resources, map]);

  return null;

}

export default FitMapBounds;