import { useState, useEffect } from "react";
import {
  CardItem,
  HeaderNav,
  Navbar,
  MapSPBU,
  useGeolocation,
  CategoryBar,
} from "../../component";
import { Gap, CustomInput } from "../../component/atom";
import "./spbu.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FindSPBU,
  FilterSPBU,
  SearchSPBU,
} from "../../config/Redux/action/getSPBU";
import { useHistory, Link } from "react-router-dom";
import { labelmapLogo } from "../../assets";
import { Scrollbars } from "react-custom-scrollbars";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Axios from "axios";
import { URIChart } from "../../utils";

const SPBU = () => {
  const { data } = useSelector((state) => state.GetSPBU);
  const [search, setSearch] = useState("");
  const [listMenu, setListMenu] = useState("");
  const showListMenu = () => setListMenu(!listMenu);
  const [nearby, setNearby] = useState("");
  const showNearby = () => setNearby(!nearby);
  const [isFiltered, setIsFiltered] = useState(false); // Track filter state
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  //get user location(GPS)
  const location = useGeolocation();

  const [allMapData, setAllMapData] = useState([]); // State untuk semua marker di map

  // Fetch ALL data untuk map markers (tidak ada pagination)
  useEffect(() => {
    Axios.get(`${URIChart}/map?cmid=3&limit=10000`)
      .then((res) => {
        setAllMapData(res.data.response || []);
      })
      .catch((err) => {
        console.log('Error fetching all map data:', err);
      });
  }, []);

  //INITIAL FETCH & SEARCH
  useEffect(() => {
    if (search) {
      dispatch(SearchSPBU({ name: search }));
    } else {
      dispatch(FindSPBU());
    }
  }, [search]);

  //search
  const onSubmit = (e) => {
    e.preventDefault(e);
    dispatch(
      SearchSPBU({
        name: search,
      })
    );
  };

  //filter
  const onSelect = (e) => {
    e.preventDefault(e);
    dispatch(FilterSPBU());
    setIsFiltered(true);
  };

  return (
    <>
      <CategoryBar activeCategory="spbu" />
      <div className="main-page-category-fuel">

        {/* list location version desktop */}
        <div className="left-category-fuel">
          <div className="d-flex justify-content-between">
            <Link to="/">
              <img src={labelmapLogo} alt="Label Maps" style={{ width: '70px', cursor: 'pointer', marginTop: '9px', marginLeft: '6px' }} />
            </Link>
            <div onClick={handleShow} className="btnAddPlace">
              <i className="fas fa-plus icon-plus pt-1 !pt-[14px] !mr-[6px]" style={{ fontSize:'12px'}} />
              <p>Add Place</p>
            </div>
          </div>
          <div style={{ zIndex: 2 }}>
            <CustomInput
              placeholder="Search Location"
              className="input-fuel"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Gap height={15} />
            <div className="row mx-2">
                <div className="col-md-6 mt-2">
                  <div className="search-box-fuel">
                    <input type="text" placeholder="Nearby Locations" value="Nearby Locations" readOnly></input>
                    <a href="#" className="icon">
                      <input type="checkbox" id="nearby" className="check-input m-2 mt-3"  name="nearby" value="nearby" checked={nearby} onChange={showNearby} ></input>
                      <label for="nearby" className="checkbox">
                        <svg viewBox="0 0 22 16" fill="none">
                          <path d="M1 6.85L8.09677 14L21 1"></path>
                        </svg>
                      </label>
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <select
                    className="custom-select"
                    name="iso"
                    id="iso"
                    style={{ fontSize: 12, height:'6ex' }}
                    onChange={(e) => onSelect(e)}
                  >
                    <option hidden selected>
                      Filter by Certificate
                    </option>
                    <option value="PastiPas">Pasti Pas</option>
                  </select>
                </div>
            </div>
            <Scrollbars style={{ height: "75vh", marginTop: '4ex' }} >
              {nearby
                ? data && Array.isArray(data) && data.map((items) => {
                    if (!location.lat || !location.lng) return null;

                    const lat1 = parseFloat(location.lat);
                    const lon1 = parseFloat(location.lng);
                    const lat2 = parseFloat(items.latitude);
                    const lon2 = parseFloat(items.longitude);
                    const R = 6371e3; // earth radius in meter

                    const φ1 = lat1 * (Math.PI / 180);
                    const φ2 = lat2 * (Math.PI / 180);
                    const Δφ = (lat2 - lat1) * (Math.PI / 180);
                    const Δλ = (lon2 - lon1) * (Math.PI / 180);

                    const a =
                      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                      Math.cos(φ1) *
                        Math.cos(φ2) *
                        (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    let markerPlace = [];
                    const distance = (R * c) / 1000;
                    markerPlace.push(distance);
                    if (markerPlace < 10) {
                      return (
                        <CardItem
                          onClick={() =>
                            history.push(`/detail_place/${items.map_id}`)
                          }
                          key={items.map_id}
                          name={items.name}
                          location={items.location}
                          images={items.photo}
                          rating={items.rating}
                          facility={items.facility}
                          map_id={items.map_id}
                        />
                      );
                    }
                  })
                : data && Array.isArray(data) && data.map((items) => {
                    return (
                      <CardItem
                        onClick={() =>
                          history.push(`/detail_place/${items.map_id}`)
                        }
                        key={items.map_id}
                        name={items.name}
                        location={items.location}
                        images={items.photo}
                        rating={items.rating}
                        facility={items.facility}
                        map_id={items.map_id}
                      />
                    );
                  })}
            </Scrollbars>
          </div>
        </div>

        {/* map */}
        <div className="right-category-fuel">
          <div className="maps-category-fuel">
            <MapSPBU map_id={data.map_id} nearby={nearby} data={isFiltered || search ? data : allMapData} />
          </div>
        </div>

        {/* list location version mobile */}
        <div className="detail-category-fuel">
          <div className="view-list-fuel" onClick={showListMenu}>
            <p className="text-view-list-fuel">View List</p>
          </div>
          <div
            className={
              listMenu ? "detail-category-active-fuel" : "view-list-fuel"
            }
          >
            <Gap height={15} />
            <div className="d-flex justify--around">
              <div className="ml-3 d-flex">
                <input
                  className="mt-3 mr-2"
                  type="checkbox"
                  id="nearby"
                  name="nearby"
                  value="nearby"
                  checked={nearby}
                  onChange={showNearby}
                />
                <p className="mt-2">Locations near me</p>
              </div>

              <select
                className="custom-select filter-category-fuel"
                name="iso"
                id="iso"
                style={{ width: "40%", fontSize: 12, marginBottom: 10 }}
                onChange={(e) => onSelect(e)}
              >
                <option disabled selected>
                  Filter
                </option>
                <option value="PastiPas">Pasti Pas</option>
              </select>
            </div>
            <Scrollbars style={{ height: "70vh" }}>
              {nearby
                ? data.map((items) => {
                    const lat1 = parseFloat(location.coordinates.lat);
                    const lon1 = parseFloat(location.coordinates.lng);
                    const lat2 = parseFloat(items.latitude);
                    const lon2 = parseFloat(items.longitude);
                    const R = 6371e3; // earth radius in meter

                    const φ1 = lat1 * (Math.PI / 180);
                    const φ2 = lat2 * (Math.PI / 180);
                    const Δφ = (lat2 - lat1) * (Math.PI / 180);
                    const Δλ = (lon2 - lon1) * (Math.PI / 180);

                    const a =
                      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                      Math.cos(φ1) *
                        Math.cos(φ2) *
                        (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    let markerPlace = [];
                    const distance = (R * c) / 1000;
                    markerPlace.push(distance);
                    if (markerPlace < 10) {
                      return (
                        <CardItem
                          onClick={() =>
                            history.push(`/detail_place/${items.map_id}`)
                          }
                          key={items.map_id}
                          name={items.name}
                          location={items.location}
                          images={items.photo}
                          rating={items.rating}
                          facility={items.facility}
                          map_id={items.map_id}
                        />
                      );
                    }
                  })
                : data && Array.isArray(data) && data.map((items) => {
                    return (
                      <CardItem
                        onClick={() =>
                          history.push(`/detail_place/${items.map_id}`)
                        }
                        key={items.map_id}
                        name={items.name}
                        location={items.location}
                        images={items.photo}
                        rating={items.rating}
                        facility={items.facility}
                        map_id={items.map_id}
                      />
                    );
                  })}
            </Scrollbars>
            <div className="view-map-fuel" onClick={showListMenu}>
              <p className="text-view-map-fuel">
                <i className="fas fa-map-marked-alt"> View Map</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SPBU;
