import { useState, useEffect } from "react";
import { useMedia } from "use-media";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import {
  CardItem, 
  Navbar, 
  MapHotel,
  useGeolocation,
} from "../../../component";
import "../CompanyMobile/companyMobile.css";
import {
  FilterHotel,
  SearchHotel,
} from "../../../config/Redux/action/getHotel";
import { Gap, CustomInput } from "../../../component/atom";

const HotelMobile = () => {

  const { data }                   = useSelector((s) => s.GetHotel)
  const [search, setSearch]        = useState("");
  const [listMenu, setListMenu]    = useState("");
  const [nearby, setNearby]        = useState("");
  const [modal, setModal]          = useState(false)
  const [nameFocused, setNameFocused] = useState(false)
  const [style, setStyle]          = useState("input-mobile");
  const history                    = useHistory();
  const dispatch                   = useDispatch();
  const location                   = useGeolocation();
  const isMobile                   = useMedia({ minWidth: "768px" })
  const showListMenu               = () => setListMenu(!listMenu);
  const showNearby                 = () => setNearby(!nearby);

  //search
  // const onSubmit = (e) => {
  //   e.preventDefault(e);
  //   dispatch(
  //     SearchHotel({
  //       name: search,
  //     })
  //   );
  //   dispatch(showListMenu)
  // };

  useEffect(() => {
    dispatch(SearchHotel({
      name: search
    }))
  }, [search])
 
  //filter
  const onSelect = (e) => {
    e.preventDefault(e);
    dispatch(
      FilterHotel({
        isoid: e.target.value,
      })
    );
    dispatch(showListMenu)
  };

  //nearby 
  const near = () => {
    dispatch(showNearby)
    dispatch(showListMenu)
  }
  useEffect(() => {
    if (window.innerWidth > 767) return history.replace("/hotel")
  }, [])

  useEffect(() => {
    if (!modal) setModal(isMobile)
  }, [isMobile])

  const _onFocus = () => { 
    setNameFocused(true)
    setStyle("input-mobile-active");
  };

  const _onBlur = () => {
    setNameFocused(false)
    setStyle("input-mobile");

  };

  return (
    <>
      <div className={listMenu? "hide-map" : "map"}>
        <div className="navigation">
          <Navbar/>
          <div onClick={showListMenu} className="search-here">
            <p className="title-search">Search location</p>
          </div>
        </div>
        <div className="map-mobile">
          <MapHotel map_id={data.map_id} nearby={nearby} />
        </div>
      </div>
      <div 
        // onClick={showListMenu} 
        className={listMenu ? "detail-active-company-mobile" : "search-here"}>
        <Gap height={20} />
        {/* <form onSubmit={(e) => onSubmit(e)}> */}
        <CustomInput
          placeholder="Search Location"
          className={style}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onChange={(e) => setSearch(e.target.value)}
        />
          {/* <TextInputMobile onChange={(e) => setSearch(e.target.value)} /> */}
        {/* </form> */}
        <Gap height={20} />
        <div className="feature d-flex">
          <div className="ml-3 d-flex">
            <input
              className="mt-3 mr-2"
              type="checkbox"
              id="nearby"
              name="nearby"
              value="nearby"
              checked={nearby}
              onChange={near}
            />
            <p className="mt-2">Nearby Location</p>
          </div>
          <Gap width={15} height={25}/>
          <select
            className="custom-select"
            name="iso"
            id="iso"
            style={{ width: "40%", fontSize: 12, marginBottom: 10 }}
            onChange={(e) => onSelect(e)}
          >
            <option disabled selected>
              Filter
            </option>
            <option value="CHSE">CHSE</option>
          </select>
        </div>
        <Gap height={10}/>
        <Scrollbars style={{ height: "69vh" }}>    
          {nearby
            ? data.map((items) => {
              // console.log('oooooooooooooo', items.facility)
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
          if (markerPlace < 20) {
            return (
              <CardItem
                onClick={() =>
                  
                  history.push(`/detail_place/${items.map_id}`)
                }
                key={items.map_id}
                name={items.name}
                location={items.location}
                // images={items.photo}
                rating={items.rating}
                facility={items.facility}
                map_id={items.map_id}
              />
            );
          }
        })
      : data.map((items) => {
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
    </>
    
  )
}

export default HotelMobile