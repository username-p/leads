import React, { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Geocode from "react-geocode";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from "react-google-maps";
import MarckerIcone from "../assets/pin-marker.png";
import CustomMapinfowindow from "./elements/CustomMapinfowindow";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBcinxDTLda0iCLov0RRcX0ueddDDtBMxE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `0` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ location, search, locationArray, selectedItem }) => {
  let mounted = true;
  const styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ];
  const layer = [
    {
      query: {
        select: "geometry",
        from: "1S4aLkBE5u_WS0WMVSchhBgMLdAARuPEjyW4rs20",
        where: "col1 contains 'MAR'",
        styles: [
          {
            polylineOptions: {
              strokeColor: "#333333",
              strokeWeight: 2,
            },
          },
        ],
        suppressInfoWindows: true,
      },
    },
  ];
  const [isClicked, setIsClicked] = useState(-1);
  const [markers, setMarkers] = useState([]);
  const [centred, setCentred] = useState({ lat: 30.4278, lng: -9.5981 });

  const getAddress = async () => {
    Geocode.setApiKey("AIzaSyBcinxDTLda0iCLov0RRcX0ueddDDtBMxE");
    Geocode.setLanguage("en");
    const array = [];

    await Geocode.fromAddress(search).then(
      async (response) => {
        response.results.map(async (result) => {
          const { lat, lng } = await result.geometry.location;
          array.push({
            lat: lat,
            lng: lng,
            address: result.formatted_address,
          });
        });
      },
      (error) => {
        console.error(error);
      }
    );
    setMarkers(array);
  };

  useEffect(() => {
    if (typeof search !== "undefined" && search && mounted) {
      getAddress();
    }
    return () => {
      mounted = false;
    };
  }, [search]);

  useEffect(() => {
    if (mounted) {
      setMarkers(locationArray);
    }
    return () => {
      mounted = false;
    };
  }, [locationArray]);

  useEffect(() => {
    if (mounted && markers.length !== 0) {
      const centredLocation = markers[0];
      const latt = centredLocation?.location?.latitude;
      const lngg = centredLocation?.location?.longitude;
      setCentred({ ...centred, lat: latt, lng: lngg });
    }
    return () => {
      mounted = false;
    };
  }, [markers]);

  useEffect(() => {
    if (selectedItem && markers) {
      markers.map((marker, index) => {
        if (selectedItem === marker.aid) {
          setIsClicked(index);
        }
      });
    }
  }, [selectedItem]);

  return (
    <GoogleMap
      defaultZoom={3}
      center={markers[0] ? centred : location}
      options={{
        styles: styles,
        layer: layer,
        disableDefaultUI: true,
        fullscreenControl: true,
      }}
    >
      {markers.map((item, index) => (
        <Marker
          position={{
            lat: item?.location?.latitude,
            lng: item?.location?.longitude,
          }}
          key={index}
          icon={MarckerIcone}
          onClick={() => {
            if (index === isClicked) {
              setIsClicked(-1);
            } else {
              setIsClicked(index);
            }
          }}
        >
          <AnimatePresence>
            {isClicked === index ? (
              <InfoWindow onCloseClick={() => setIsClicked(-1)}>
                <CustomMapinfowindow
                  name={item?.aid}
                  ip={item?.ip}
                  {...item?.location}
                />
              </InfoWindow>
            ) : null}
          </AnimatePresence>
        </Marker>
      ))}
    </GoogleMap>
  );
});

const Map = ({
  parent,
  height,
  minhieght,
  margin,
  search,
  locationArray,
  selectedItem,
}) => {
  const [isMarkerShown, setIsMarkerShown] = useState(false);
  const [location, setLocation] = useState({ lat: 30.4278, lng: -9.5981 });
  const delayedShowMarker = () => {
    setTimeout(() => {
      setIsMarkerShown(true);
    }, 2000);
  };
  const handleMarkerClick = () => {
    setIsMarkerShown(false);
    delayedShowMarker();
  };

  return (
    <Container
      parent={parent}
      height={height}
      minhieght={minhieght}
      margin={margin}
      className="testing"
    >
      <MapComponent
        isMarkerShown={isMarkerShown}
        onMarkerClick={handleMarkerClick}
        search={search}
        location={location}
        parent={parent}
        height={height}
        minhieght={minhieght}
        margin={margin}
        locationArray={locationArray}
        selectedItem={selectedItem}
      />
    </Container>
  );
};

export default Map;
const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  position: relative;
`;
