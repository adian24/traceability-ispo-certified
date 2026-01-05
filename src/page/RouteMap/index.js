import { useEffect, useState, useCallback, useRef} from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./routeMap.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { labelmapLogo } from "../../assets";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { osmTileLayer, osmAttribution, markerHotel, markerRestaurant, markerCompany, markerUser, markerSPBU } from "../../utils";
import useGeoLocation from "../../component/molecule/UseGeoLocation";
import {SearchCompany} from "../../config/Redux/action/getCompany";
import {SearchHotel} from "../../config/Redux/action/getHotel";
import {SearchPlace} from "../../config/Redux/action/getPlace";
import {SearchSPBU} from "../../config/Redux/action/getSPBU";
import { Scrollbars } from "react-custom-scrollbars";
import { CardItem } from "../../component";
import Spinner from 'react-bootstrap/Spinner'
import { GetById } from "../../config/Redux/action/getById";

const RouteMap = () => {
 
  const dispatch                                              = useDispatch();
  const { data }                                              = useSelector((state) => state.GetById);
  const { data: get_data }                                    = useSelector((s) => data?.catmap_id == '1' ? s.GetPlace : ( data?.catmap_id == '2' ? s.GetHotel : ( data?.catmat_id == '3' ? s.GetSPBU : s.GetCompany )));
  // const { data: data_hotel }                                  = useSelector((s) => s.GetHotel);
  // const { data: data_restaurant }                             = useSelector((s) => s.GetPlace);
  const [sidebar, setSidebar]                                 = useState(false);
  // const [showDiv, setShowDiv]                                 = useState();
  const [myLocation, setMyLocation]                           = useState('');
  // const [lokasiAwal, setLokasiAwal]                           = useState();
  const showSidebar                                           = () => setSidebar(!sidebar);
  const [styleDefaultRoute, setStyleDefaultRoute]             = useState("btn_option_direc_active text-blue");
  const [styleCarRoute, setStyleCarRoute]                     = useState("btn_option_direc_non_active text-dark");
  const [styleWalkRoute, setStyleWalkRoute]                   = useState("btn_option_direc_non_active text-dark");
  const [styleTransportationRoute, setStyleTransportationRoute]             = useState("btn_option_direc_non_active text-dark");
  const [directionsResponse, setDirectionsResponse]           = useState(null);
  const [distance, setDistance]                               = useState('')
  const [duration, setDuration]                               = useState('')
  const [dnone, setDnone]                                     = useState("row my_location");
  const [click, setClick]                                     = useState(false)
  const [routingControl, setRoutingControl]                   = useState(null)
  const [mapInstance, setMapInstance]                         = useState(null)
  const location                                              = useGeoLocation();
  const [searchFirstLocation, setSearchFirstLocation]         = useState("");
  const [searchSecondLocation, setSearchSecondLocation]       = useState("");
  // const [FocusFirstLocation, setFocusFirstLocation]           = useState("");
  // const [FocusSecondLocation, setFocusSecondLocation]         = useState("");
  // const [BlurFirstLocation, setBlurFirstLocation]             = useState("");
  // const [BlurSecondLocation, setBlurSecondLocation]           = useState("");
  const [CompanyNameFirst, setCompanyNameFirst]               = useState('');
  const [CompanyName, setCompanyName]                         = useState(data?.name || '');
  const [loading, setLoading]                                 = useState(false);
  const [clickedFirst, setClickedFirst]                       = useState(true)
  const [clicked, setClicked]                                 = useState(true)
  const [latitudeFirstLocation, setLatitudeFirstLocation]     = useState(null)
  const [longitudeFirstLocation, setLongitudeFirstLocation]   = useState(null)
  const [latitudeSecondLocation, setLatitudeSecondLocation]   = useState(data?.latitude || null)
  const [longitudeSecondLocation, setLongitudeSecondLocation] = useState(data?.longitude || null)
  const [FirstLocationLength, setFirstLocationLength]         = useState(0)
  const [SecondLocationLength, setSecondLocationLength]       = useState(0)

  // Use ref to track if route creation is in progress
  const isCreatingRouteRef = useRef(false);

  // Monkey-patch Leaflet to prevent _removePath and appendChild errors
  useEffect(() => {
    // Override the problematic method in Leaflet to handle undefined _renderer
    if (typeof L !== 'undefined' && L.Path && L.Path.prototype) {
      const originalOnRemove = L.Path.prototype.onRemove;

      L.Path.prototype.onRemove = function(map) {
        try {
          // Check if _renderer exists before calling
          if (this._renderer && this._renderer._removePath) {
            return originalOnRemove.call(this, map);
          } else {
            console.warn('Skipping onRemove: _renderer not available');
            // Clean up basic properties without calling _removePath
            if (this._map) {
              this._map = null;
            }
          }
        } catch (error) {
          console.warn('Error in onRemove, suppressing:', error);
        }
      };
    }

    // Patch L.Routing.Control to handle DOM errors
    if (typeof L !== 'undefined' && L.Routing && L.Routing.Control && L.Routing.Control.prototype) {
      const originalOnAdd = L.Routing.Control.prototype.onAdd;

      L.Routing.Control.prototype.onAdd = function(map) {
        try {
          // Validate map container exists
          if (!map._container || !map._container.appendChild) {
            console.error('Map container not ready for routing control');
            return document.createElement('div'); // Return dummy element
          }
          return originalOnAdd.call(this, map);
        } catch (error) {
          console.error('Error adding routing control:', error);
          return document.createElement('div'); // Return dummy element
        }
      };
    }
  }, []);

  // //SEARCH
  useEffect(() => {
    if (!data) return; // Guard clause
    // setTimeout(() => {
      if (data.catmap_id == '1'){
        dispatch(SearchPlace({ name: searchFirstLocation }));
      }else if(data.catmap_id == '2'){
        dispatch(SearchHotel({ name: searchFirstLocation }));
      }else if(data.catmap_id == '3'){
        dispatch(SearchSPBU({ name: searchFirstLocation }));
      }else{
        dispatch(SearchCompany({ name: searchFirstLocation }));
      }
    // },10000)
  }, [searchFirstLocation, data]);

  useEffect(() => {
    if (!data) return; // Guard clause
    // setTimeout(() => {
      if (data.catmap_id == '1'){
        dispatch(SearchPlace({ name: searchSecondLocation }));
      }else if(data.catmap_id == '2'){
        dispatch(SearchHotel({ name: searchSecondLocation }));
      }else if(data.catmap_id == '3'){
        dispatch(SearchSPBU({ name: searchSecondLocation }));
      }else{
        dispatch(SearchCompany({ name: searchSecondLocation }));
      }
    // },10000)
  }, [searchSecondLocation, data]);

  // DISABLED: Cleanup was causing _removePath errors
  // Routing control will be cleaned up automatically when map is destroyed
  // useEffect(() => {
  //   return () => {
  //     if (routingControl && mapInstance) {
  //       try {
  //         if (mapInstance._panes && routingControl._map) {
  //           mapInstance.removeControl(routingControl);
  //         }
  //       } catch (error) {
  //         console.error('Error cleaning up routing control:', error);
  //       }
  //     }
  //   };
  // }, [routingControl, mapInstance]);

  // DISABLED: Auto-route was causing concurrent routing control errors
  // Routes will only be created when user explicitly selects locations from dropdown
  // useEffect(() => {
  //   if (latitudeFirstLocation && longitudeFirstLocation &&
  //       latitudeSecondLocation && longitudeSecondLocation &&
  //       mapInstance && mapInstance._panes && !loading) {
  //     const timeoutId = setTimeout(() => {
  //       if (mapInstance && mapInstance._panes && !isCreatingRouteRef.current) {
  //         Route("DRIVING", latitudeFirstLocation, longitudeFirstLocation, latitudeSecondLocation, longitudeSecondLocation);
  //       }
  //     }, 500);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [latitudeFirstLocation, longitudeFirstLocation, latitudeSecondLocation, longitudeSecondLocation, mapInstance]);

  const onClickMyLocation = () => {
    console.log('My Location clicked');
    console.log('User location:', location);
    console.log('Current destination:', latitudeSecondLocation, longitudeSecondLocation);

    setMyLocation('My Location')

    // Check if user location is available
    if (!location.lat || !location.lng) {
      alert('GPS location not available. Please enable location access or wait for GPS signal.');
      console.warn('GPS not available');
      return;
    }

    // Set user's current location as first location
    setLatitudeFirstLocation(location.lat);
    setLongitudeFirstLocation(location.lng);
    setCompanyNameFirst('My Location');

    // Create route if second location already selected
    if (latitudeSecondLocation && longitudeSecondLocation) {
      console.log('Creating route from My Location to destination');
      console.log('Waiting for map to be fully ready...');

      // Wait longer for map to be fully initialized
      setTimeout(() => {
        if (mapInstance && mapInstance._controlCorners && mapInstance._controlContainer) {
          console.log('Map ready, creating route...');
          Route("DRIVING", location.lat, location.lng, latitudeSecondLocation, longitudeSecondLocation);
        } else {
          console.warn('Map still not ready, retrying in 500ms...');
          console.warn('mapInstance:', mapInstance ? 'EXISTS' : 'NULL');
          console.warn('_controlCorners:', mapInstance?._controlCorners);
          console.warn('_controlContainer:', mapInstance?._controlContainer);

          setTimeout(() => {
            console.log('Retry: Calling Route()...');
            Route("DRIVING", location.lat, location.lng, latitudeSecondLocation, longitudeSecondLocation);
          }, 500);
        }
      }, 500);
    } else {
      console.log('Destination not selected yet. Please select destination (Location B) first.');
      alert('Please select a destination (Location B) first.');
    }
  }

  const _onFocusFirstLocation = () => {
    // setShowDiv(true);
    // setFocusFirstLocation(true)
    setClickedFirst(true);
    // setDnone('row my_location')
    // setStyle("input-company-active");
  };

  const _onBlursFirstLocation = () => {
    // setShowDiv(false);
    // setFocusFirstLocation(false)
    setClicked(false)
    // setDnone('row my_location d-none')
    // setStyle("input-company");
  };

  const _onFocusSecondLocation = () => {
    // setShowDiv(true);
    // setFocusSecondLocation(true)
    setClicked(true);
    // setDnone('row my_location')
    // setStyle("input-company-active");
  };

  const _onBlursSecondLocation = () => {
    // setShowDiv(false);
    // setFocusSecondLocation(false)
    setClickedFirst(false)
    // setDnone('row my_location d-none')
    // setStyle("input-company");
  };

  // layer route map
  const onLoad = trafficLayer => {
    console.log('trafficLayer: ', trafficLayer)
  }

  const onLoadTransit = transitLayer => {
    console.log('transitLayer: ', transitLayer)
  }

  const onLoadWalking = bicyclingLayer => {
    console.log('bicyclingLayer: ', bicyclingLayer)
  }

  const handleClick = () => {
    setClick(!click)
  }

  // Function to safely clear routing control
  const clearRoutingControl = () => {
    if (!routingControl || !mapInstance) {
      return;
    }

    try {
      // Check if map still has panes (not destroyed)
      if (!mapInstance._panes) {
        setRoutingControl(null);
        setDistance('');
        setDuration('');
        return;
      }

      // Check if routing control is still attached to map
      if (routingControl._map) {
        try {
          // Remove from map with error handling
          mapInstance.removeControl(routingControl);
        } catch (removeError) {
          console.warn('Error removing routing control from map:', removeError);
          // Try alternative removal method
          try {
            if (routingControl.onRemove) {
              routingControl.onRemove(mapInstance);
            }
          } catch (altError) {
            console.warn('Alternative removal also failed:', altError);
          }
        }
      }
    } catch (error) {
      console.error('Error in clearRoutingControl:', error);
    } finally {
      // Always clear state regardless of errors
      setRoutingControl(null);
      setDistance('');
      setDuration('');
    }
  };

  // function calculate duration & distance route
  const Route = (route, latitude1, longitude1, latitude2, longitude2) => {
    console.log('=== Route() called ===');
    console.log('Route mode:', route);
    console.log('From:', latitude1, longitude1);
    console.log('To:', latitude2, longitude2);

    // Prevent concurrent route creation
    if (isCreatingRouteRef.current) {
      console.warn('Route creation already in progress, skipping...');
      return;
    }

    // Validate map instance is ready with container
    if (!mapInstance || !mapInstance._panes || !mapInstance._container) {
      console.warn('Map instance not ready yet');
      console.warn('mapInstance:', mapInstance);
      return;
    }

    // Additional check for map container
    if (!mapInstance._container.appendChild) {
      console.warn('Map container not ready for DOM operations');
      return;
    }

    // Check for control corners (needed for routing control)
    if (!mapInstance._controlCorners || !mapInstance._controlContainer) {
      console.warn('Map control corners not ready yet');
      console.warn('_controlCorners:', mapInstance._controlCorners);
      console.warn('_controlContainer:', mapInstance._controlContainer);
      return;
    }

    // Validate coordinates
    if (!latitude1 || !longitude1 || !latitude2 || !longitude2) {
      console.warn('Invalid coordinates provided:', {latitude1, longitude1, latitude2, longitude2});
      return;
    }

    console.log('✓ All validations passed, creating route...');

    isCreatingRouteRef.current = true;
    setLoading(true);

    const startPoint = L.latLng(parseFloat(latitude1), parseFloat(longitude1));
    const endPoint = L.latLng(parseFloat(latitude2), parseFloat(longitude2));

    console.log('StartPoint:', startPoint);
    console.log('EndPoint:', endPoint);
    console.log('Existing routingControl?', routingControl ? 'YES' : 'NO');

    // If routing control already exists, just update waypoints instead of recreating
    if (routingControl && routingControl._map) {
      console.log('→ Updating existing route waypoints...');

      // Use setTimeout to ensure this happens in next tick
      setTimeout(() => {
        try {
          // Validate everything is still valid
          if (routingControl && routingControl._map &&
              mapInstance && mapInstance._panes && mapInstance._container &&
              mapInstance._container.appendChild) {
            console.log('→ Calling setWaypoints...');
            routingControl.setWaypoints([startPoint, endPoint]);
            console.log('✓ setWaypoints called successfully');
          } else {
            console.warn('→ Routing control or map no longer valid for waypoint update');
            isCreatingRouteRef.current = false;
            setLoading(false);
          }
        } catch (error) {
          console.error('→ Error updating waypoints:', error);
          // Don't try to recreate - just reset flags
          isCreatingRouteRef.current = false;
          setLoading(false);
        }
      }, 50);

      // Reset flag after a delay
      setTimeout(() => {
        isCreatingRouteRef.current = false;
      }, 300);

      return;
    }

    console.log('→ Creating NEW routing control...');

    // Create new routing control
    setTimeout(() => {
      // Re-validate map is still ready
      if (!mapInstance || !mapInstance._panes || !mapInstance._container) {
        console.warn('Map no longer valid, aborting route creation');
        isCreatingRouteRef.current = false;
        setLoading(false);
        return;
      }

      // Re-validate map container
      if (!mapInstance._container.appendChild) {
        console.warn('Map container no longer valid, aborting route creation');
        isCreatingRouteRef.current = false;
        setLoading(false);
        return;
      }

      try {
        console.log('→ Creating L.Routing.control...');
        console.log('→ Waypoints:', [startPoint, endPoint]);

        // Create routing control
        const control = L.Routing.control({
          waypoints: [startPoint, endPoint],
          routeWhileDragging: false,
          showAlternatives: false,
          fitSelectedRoutes: true,
          show: false, // Hide the default instructions panel
          lineOptions: {
            styles: [{ color: '#001C54', opacity: 0.8, weight: 6 }]
          },
          createMarker: function() { return null; }, // Don't create default markers
        });

        console.log('→ Control object created:', control);
        console.log('→ Map instance for addTo:', mapInstance);
        console.log('→ Map has _controlCorners?', !!mapInstance._controlCorners);
        console.log('→ Map has _controlContainer?', !!mapInstance._controlContainer);

        console.log('→ Adding control to map...');
        control.addTo(mapInstance);
        console.log('✓ Control added to map successfully');
        console.log('✓ Control._map:', control._map ? 'SET' : 'NOT SET');

        control.on('routesfound', function(e) {
          console.log('✓ Route found!', e);
          const routes = e.routes;
          const summary = routes[0].summary;

          // Distance in km
          const distanceInKm = (routes[0].summary.totalDistance / 1000).toFixed(2);
          setDistance(`${distanceInKm} km`);

          // Duration
          const durationInMinutes = Math.round(routes[0].summary.totalTime / 60);
          const hours = Math.floor(durationInMinutes / 60);
          const minutes = durationInMinutes % 60;
          setDuration(hours > 0 ? `${hours} hour ${minutes} mins` : `${minutes} mins`);

          console.log('✓ Distance:', distanceInKm + ' km');
          console.log('✓ Duration:', hours > 0 ? `${hours} hour ${minutes} mins` : `${minutes} mins`);

          setLoading(false);
          isCreatingRouteRef.current = false;
        });

        control.on('routingerror', function(e) {
          console.error('✗ Routing error:', e);
          setLoading(false);
          isCreatingRouteRef.current = false;
        });

        console.log('→ Saving routing control to state...');
        setRoutingControl(control);
        console.log('✓ Routing control saved');
      } catch (error) {
        console.error('✗ Error creating routing control:', error);
        setLoading(false);
        isCreatingRouteRef.current = false;
      }
    }, 100); // Delay 100ms untuk cleanup
  }

  // Create marker icons
  const hotelIcon = L.icon({
    iconUrl: markerHotel,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const restaurantIcon = L.icon({
    iconUrl: markerRestaurant,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const spbuIcon = L.icon({
    iconUrl: markerSPBU,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const companyIcon = L.icon({
    iconUrl: markerCompany,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const userIcon = L.icon({
    iconUrl: markerUser,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  const getMarkerIcon = () => {
    if (!data) return companyIcon; // Default icon if no data

    if (data.catmap_id === "2") {
      return hotelIcon;
    } else if (data.catmap_id === "1") {
      return restaurantIcon;
    } else if (data.catmap_id === "3") {
      return spbuIcon;
    } else {
      return companyIcon;
    }
  };


  // Helper component to get map instance
  const MapInstanceSetter = () => {
    const map = useMap();

    useEffect(() => {
      // Only set if map is ready and not already set
      if (map && map._panes && !mapInstance) {
        // Wait longer to ensure _controlCorners and _controlContainer are initialized
        setTimeout(() => {
          if (map._controlCorners && map._controlContainer) {
            console.log('✓ Map fully ready with control corners and container');
            setMapInstance(map);
          } else {
            console.warn('Map panes ready but controls not yet, waiting longer...');
            console.warn('_controlCorners:', map._controlCorners);
            console.warn('_controlContainer:', map._controlContainer);

            setTimeout(() => {
              // Double check again before setting
              if (map._controlCorners && map._controlContainer) {
                console.log('✓ Map controls ready after additional wait');
                setMapInstance(map);
              } else {
                console.error('Map controls still not ready after 700ms total wait!');
                console.error('_controlCorners:', map._controlCorners);
                console.error('_controlContainer:', map._controlContainer);
                // Set anyway as last resort, but log the issue
                console.warn('Setting mapInstance anyway as last resort...');
                setMapInstance(map);
              }
            }, 500);
          }
        }, 200);
      }
    }, [map]);

    return null;
  };

  // Map component with ref to access map instance
  const MapComponent = () => {
    // Fallback center coordinates
    const centerLat = data.latitude ? parseFloat(data.latitude) : 2.0;
    const centerLng = data.longitude ? parseFloat(data.longitude) : 130.0;

    return (
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <MapInstanceSetter />
        <TileLayer
          attribution={osmAttribution}
          url={osmTileLayer}
        />

        {/* Destination marker */}
        {latitudeSecondLocation && longitudeSecondLocation && (
          <Marker
            position={[parseFloat(latitudeSecondLocation), parseFloat(longitudeSecondLocation)]}
            icon={getMarkerIcon()}
          />
        )}

        {/* User location marker */}
        {location.lat && location.lng && (
          <Marker
            position={[location.lat, location.lng]}
            icon={userIcon}
          />
        )}
      </MapContainer>
    );
  };
  
  const onChangeFirstLocation = (e) => {
      setFirstLocationLength(e.length)
      setSearchFirstLocation(e)
      setCompanyNameFirst(e)
      setMyLocation(e)
  }

  const onChangeSecondLocation = (e) => {
    setSecondLocationLength(e.length)
      setSearchSecondLocation(e)
      setCompanyName(e)
  }

  const onClickDriving = () => {
    if(CompanyNameFirst == undefined){
      setMyLocation('My Location')
    }
    setStyleDefaultRoute('btn_option_direc_non_active text-dark')
    setStyleCarRoute('btn_option_direc_active text-blue')
    setStyleWalkRoute('btn_option_direc_non_active text-dark')
    setStyleTransportationRoute('btn_option_direc_non_active text-dark')
    // Only create route if both locations are selected
    if (latitudeFirstLocation && longitudeFirstLocation && latitudeSecondLocation && longitudeSecondLocation) {
      // These buttons usually update existing route, should work fine
      setTimeout(() => {
        Route("DRIVING", latitudeFirstLocation, longitudeFirstLocation, latitudeSecondLocation, longitudeSecondLocation)
      }, 100);
    }
  }

  const onClickWalking = () => {
    if(CompanyNameFirst == undefined){
      setMyLocation('My Location')
    }
    setStyleDefaultRoute('btn_option_direc_non_active text-dark')
    setStyleCarRoute('btn_option_direc_non_active text-dark')
    setStyleWalkRoute('btn_option_direc_active text-blue')
    setStyleTransportationRoute('btn_option_direc_non_active text-dark')
    // Only create route if both locations are selected
    if (latitudeFirstLocation && longitudeFirstLocation && latitudeSecondLocation && longitudeSecondLocation) {
      setTimeout(() => {
        Route("WALKING", latitudeFirstLocation, longitudeFirstLocation, latitudeSecondLocation, longitudeSecondLocation)
      }, 100);
    }
  }

  const onClickTransportation = () => {
    if(CompanyNameFirst == undefined){
      setMyLocation('My Location')
    }
    setStyleDefaultRoute('btn_option_direc_non_active text-dark')
    setStyleCarRoute('btn_option_direc_non_active text-dark')
    setStyleWalkRoute('btn_option_direc_non_active text-dark')
    setStyleTransportationRoute('btn_option_direc_active text-blue')
    // Only create route if both locations are selected
    if (latitudeFirstLocation && longitudeFirstLocation && latitudeSecondLocation && longitudeSecondLocation) {
      setTimeout(() => {
        Route("TRANSIT", latitudeFirstLocation, longitudeFirstLocation, latitudeSecondLocation, longitudeSecondLocation)
      }, 100);
    }
  }

  // console.log('Company Name First', CompanyNameFirst)
  // console.log('Company Name ', CompanyName)
  // console.log('FirstLocationLength',FirstLocationLength)

  // console.log('MY LOCATION', myLocation)
  // console.log('LOKASI AWAL', lokasiAwal)
  // console.log("get_data", get_data)
  // console.log("cek direction", directionsResponse)
  // console.log("by idddd", data.map_id)

  return (
    <>
      <div className="main-page">
        {/* info detail version desktop */}
        <div className="left">
          <div className="sidebardiv">
            <Link to="#" className="menu-bars">
                <Button className="button-rute" onClick={showSidebar}>
                  <i className="fas fa-directions" ></i> 
                </Button> 
            </Link>
            <span style={{ fontSize:13, marginLeft: 8 }}>Route</span>
          </div>
          <nav className="div-menu active shadow">
            <ul className="div-menu-items ml-2">
              
              <li style={{ marginTop: 10, marginBottom: 10 }} >
                <div className="row" style={{ marginLeft:'-4rem' }}>
                  <div className="col-md-3">
                    <Link to="/">
                      <img
                        alt="label map logo"
                        className="mr-1 mb-2"
                        src={labelmapLogo}
                        width={65}
                      /> 
                    </Link>
                  </div>
                  <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                    <Button className={styleDefaultRoute} style={{ width:40, borderRadius:'50%',  }} title="Travel mode recomendation" onClick={() => [ setStyleDefaultRoute('btn_option_direc_active text-blue'), setStyleCarRoute('btn_option_direc_non_active text-dark'), setStyleWalkRoute('btn_option_direc_non_active text-dark'), setStyleTransportationRoute('btn_option_direc_non_active text-dark')]}>
                      <i className="fas fa-directions " style={{ fontSize: 20, marginLeft: -3.2 }} ></i>
                    </Button>
                  </div>
                  <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                    <Button className={styleCarRoute} style={{ width:40, borderRadius:'50%' }} title="Driving" onClick={() => onClickDriving() }>
                      <i className="fas fa-car " style={{ fontSize: 20, marginLeft: -3.2 }} ></i>
                    </Button>
                  </div>
                  <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                    <Button className={styleWalkRoute} style={{ width:40, borderRadius:'50%' }} title="Walking" onClick={() => onClickWalking()}>
                      <i className="fas fa-walking " style={{ fontSize: 20, marginLeft: -2 }} ></i>
                    </Button>
                  </div>
                  <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                    <Button className={styleTransportationRoute} style={{ width:40, borderRadius:'50%' }} title="Transportation" onClick={() => onClickTransportation()}>
                      <i className="fas fa-train " style={{ fontSize: 20, marginLeft: -2}} ></i>
                    </Button>
                  </div>
                  {/* <div className="col-md-1" style={{ marginTop:'10px', marginRight: 7 }} onClick={showSidebar}> 
                    <Link to="#">
                      <i className="fas fa-motorcycle text-dark" style={{ fontSize: 20,position:'absolute', right: 0, right: 20 }}></i>
                    </Link>
                  </div> */}
                  <div className="col-md-2" style={{ marginTop:'10px' }} > 
                    <Link to={`/detail_place/${data.map_id}`}>
                      <i className="fas fa-times text-dark" style={{ fontSize: 20,position:'absolute', right: 0, right: 20 }}></i>
                    </Link>
                  </div>
                </div>
              </li>

              {/* <li style={{ marginLeft: -43, marginBottom: 30, marginTop: 20 }}>
              
              </li> */}
              {/* <li style={{ marginLeft: -45, marginBottom: -8 }}><hr/></li>
              <li style={{ marginLeft: -45, marginBottom: -8 }}>
                <div>lat FIRST: {latitudeFirstLocation}</div>
                <div>lng FIRST: {longitudeFirstLocation}</div>
              </li>
              <li style={{ marginLeft: -45, marginBottom: -8 }}><hr/></li>
              <li style={{ marginLeft: -45, marginBottom: -8 }}>
                <div>lat SECOND: {latitudeSecondLocation}</div>
                <div>lng SECOND: {longitudeSecondLocation}</div>
              </li>
              <li style={{ marginLeft: -45, marginBottom: -8 }}><hr/></li> */}

              <li style={{ marginLeft: -33, marginBottom: 20 }}>
                <div className="row">
                  <div className="col-md-1" style={{ background: '#10175c', borderTopRightRadius: 5,borderBottomRightRadius: 5 }}>
                    <i className="fas icon-lokasi-awal">A</i>
                  </div>
                  <div className="col-md-10 ">
                    {/* <input className="form-control" onChange={(e) => SearchPlace({ name: searchFirstLocation })}></input> */}
                    <input className="form-control" placeholder="Choose first location..." onFocus={_onFocusFirstLocation} onBlur={_onBlursFirstLocation} value={myLocation} onChange={(e) => onChangeFirstLocation(e.target.value)}></input>
                    {
                      searchFirstLocation && clickedFirst == true && FirstLocationLength >= 3 ? 
                        <div style={{ border:'0.1px solid #e7e7e7', marginTop:'1ex', position:'absolute', zIndex:2, background:'white', width:'90%', maxHeight:'40vh', overflowY:'scroll' }}>
                          {
                            get_data.map((items) => {
                              // console.log('items name',items.name)
                              return (

                                  <div style={{ border:'0.1px solid #e7e7e7', paddingBottom:'2ex', paddingTop:'2ex'}} onClick={() => {
                                    setClickedFirst(false);
                                    setLatitudeFirstLocation(items.latitude);
                                    setLongitudeFirstLocation(items.longitude);
                                    setCompanyNameFirst(items.name);
                                    setMyLocation(items.name);
                                    // Create route if second location already selected
                                    if (latitudeSecondLocation && longitudeSecondLocation) {
                                      // Wait for map to be ready
                                      setTimeout(() => {
                                        if (mapInstance && mapInstance._controlCorners && mapInstance._controlContainer) {
                                          Route("DRIVING", items.latitude, items.longitude, latitudeSecondLocation, longitudeSecondLocation);
                                        } else {
                                          console.warn('Map not ready for route creation from Location A selection');
                                        }
                                      }, 300);
                                    }
                                  }}>
                                    <CardItem
                                      key={items.map_id}
                                      name={items.name}
                                      location={items.location}
                                      images={items.photo}
                                      rating={items.rating}
                                      facility={items.facility}
                                      map_id={items.map_id}
                                    />
                                  </div>
                              );
                            }) 
                          }
                        </div>
                      
                      : ''
                    }
                  </div>
                </div>
              </li>

              <li style={{ marginLeft: -33, marginBottom: 20 }}>
                <div className="row" >
                  <div className="col-md-1" style={{ background: '#10175c', borderTopRightRadius: 5,borderBottomRightRadius: 5 }}>
                    <i className="fas icon-tujuan">B</i>
                  </div>
                  <div className="col-md-10 ">
                    <input className="form-control" placeholder="Choose direction..." onFocus={_onFocusSecondLocation} onBlur={_onBlursSecondLocation} value={CompanyName} onChange={(e) => onChangeSecondLocation(e.target.value)}></input>
                    {
                      searchSecondLocation && clicked == true && SecondLocationLength >= 3 ? 
                        <div style={{ border:'0.1px solid #e7e7e7', marginTop:'1ex', position:'absolute', zIndex:2, background:'white', width:'90%', maxHeight:'40vh', overflowY:'scroll' }}>
                          {
                            get_data.map((items) => {
                              return (
                                <div style={{ border:'0.1px solid #e7e7e7', paddingBottom:'2ex', paddingTop:'2ex'}}
                                onClick={() => {
                                  setClicked(false);
                                  setLatitudeSecondLocation(items.latitude);
                                  setLongitudeSecondLocation(items.longitude);
                                  setCompanyName(items.name);
                                  // Create route if first location already selected
                                  if (latitudeFirstLocation && longitudeFirstLocation) {
                                    // Wait for map to be ready
                                    setTimeout(() => {
                                      if (mapInstance && mapInstance._controlCorners && mapInstance._controlContainer) {
                                        Route("DRIVING", latitudeFirstLocation, longitudeFirstLocation, items.latitude, items.longitude);
                                      } else {
                                        console.warn('Map not ready for route creation from Location B selection');
                                      }
                                    }, 300);
                                  }
                                }}>

                                  <CardItem
                                    key={items.map_id}
                                    name={items.name}
                                    location={items.location}
                                    images={items.photo}
                                    rating={items.rating}
                                    facility={items.facility}
                                    map_id={items.map_id}
                                  />
                                </div>
                              );
                            }) 
                          }
                        </div>
                      
                      : ''
                    }
                  </div>
                </div>
              </li>

              {/* {
                showDiv == true ? <li style={{ marginLeft: -45, marginBottom: -8 }}><hr/></li> : ''         
              } */}
              <li style={{ marginLeft: -45, marginBottom: -8 }}><hr/></li>

              <li style={{ marginLeft: -33, marginBottom: -8}}
              // onClick={() => [ setMyLocation('My Location'), setDnone('row my_location d-none'), alert('My Location')]}
              onClick={onClickMyLocation}
              >
                <div className={dnone} >
                  <div className="col-md-1" style={{  }}>
                    <i className="fas fa-street-view icon-my-location"></i>
                  </div>
                  <div className="col-md-10 ml-2" style={{ lineHeight:'50px',  }}>
                    My Location
                  </div>
                </div>
              </li>

              {
                distance != '' ?
                <>
                  <li style={{ marginLeft: -45, marginBottom: -11 }}><hr/></li>
                  
                  <li style={{ marginLeft: -45, marginBottom: -11 }}>
                    <div className="row" style={{ fontWeight:'bold', color:'#001C54' }}>
                      <div className="col-md-10 ml-2" style={{ lineHeight:'50px' }}>
                        Direction Details
                      </div>
                    </div>
                  </li>

                  <li style={{ marginLeft: -33, marginBottom: -8}}>
                    <div className="row" style={{ fontSize:12 }}>
                      <div className="col-md-1">
                        <i className="fas fa-route icon-my-location"></i>
                      </div>
                      <div className="col-md-10 ml-2" style={{ lineHeight:'50px' }}>
                        <b>{distance}</b> from your location
                      </div>
                    </div>
                  </li>

                  <li style={{ marginLeft: -33, marginBottom: -8}}>
                    <div className="row" style={{ fontSize:12 }}>
                      <div className="col-md-1">
                        <i className="fas fa-clock icon-my-location"></i>
                      </div>
                      <div className="col-md-10 ml-2" style={{ lineHeight:'50px' }}>
                        {/* <b>1</b> Hour <b>25</b> Minues */}
                        {duration}
                      </div>
                    </div>
                  </li>
                </>
                : ''
              }
                  <li style={{ marginLeft: -45, marginBottom: -8 }}><hr/></li>

                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ): (
                    <div style={{ marginLeft: -33, marginBottom: -8}}>
                      <Scrollbars style={{ height: '45vh'}}>
                        <div id="panel"></div>
                      </Scrollbars>
                    </div>
                  )}
            </ul>
          </nav>
        </div>

        {/* map */}
        <div className="right">
          <div className="maps">
            <div style={{ width: "100vw", height: "100vh" }}>
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(RouteMap);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    paddingTop: 10,
  },
  preview: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
