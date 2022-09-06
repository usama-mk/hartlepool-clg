import React, { useEffect } from "react";
import { useState, useMemo } from "react";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin.tsx";
import CITIES from "./cities.json";
import "./Map.css";


import { Link } from "react-router-dom";


const TOKEN = "pk.eyJ1IjoiY2xpZW50cy1maXJlYmFzZSIsImEiOiJja28wbXpsbWQwZXMyMm5ud3M0bWs0bTJuIn0.Fi78C9sKb-9P4w9tx9A6dg" // Set your mapbox token here

function MapScreen() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "40", lon: "-100" });
  const [location, setLocation] = useState("");

  const [rooms, setRooms] = useState([{
    name: "room 1",
    name: "room 2",
    coordinates: {
    lat: 40.7128,
    lon: -74.0060
    },
    type: "paidService",
    id: 1,
    type: "paidService",
    id: 1,

  },
  {
    name: "room 2",
    coordinates: {
    lat: 20.7128,
    lon: -64.0060
    },
    type: "paidService",
    id: 1,

  }
]);

 



  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  // const pins = useMemo(
  //   () =>
  //   paidServices?.map((ps, index) => (
  //       <Marker
  //         key={`marker-${index}`}
  //         longitude={ps.coordinates.lon}
  //         latitude={ps.coordinates.lat}
  //         anchor="bottom"
  //       >
  //         <Pin onClick={() => setPopupInfo(ps)} />
  //       </Marker>
  //     )),
  //   []
  // );

  return (
    <div style={{ height: "70vh" }}>
       
      <Map
        onLoad={() => {}}
        initialViewState={{
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
          width: "100%",
          height: "50vh",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
        style
      >
        <GeolocateControl position="top-left" ref={geolocateControlRef} />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {/* PS Posts */}
        {rooms
             
              .map((ps, index) => (
                <Marker
                  key={`marker-${index}`}
                  longitude={ps.coordinates.lon}
                  latitude={ps.coordinates.lat}
                  anchor="bottom"
                >
                  <Pin onClick={() => setPopupInfo(ps)} pinColor="red" />
                </Marker>
              ))
         }

        {/* {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.coordinates.lon)}
            latitude={Number(popupInfo.coordinates.lat)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo?.location}, {popupInfo?.price} |{" "}
              <Link
                target="_new"
                to={`/${
                  popupInfo.price
                    ? "isMovable" in popupInfo
                      ? "rentposts"
                      : "paidservice"
                    : "communityserviceposts"
                }/${popupInfo._id}`}
              >
                View
              </Link>
            </div>
            <img width="100%" src={popupInfo.thumbnailImage} />
          </Popup>
        )} */}
         

         
      </Map>
      {/* <ControlPanel /> */}
    </div>
  );
}

export default MapScreen;