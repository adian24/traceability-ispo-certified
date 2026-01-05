import { useState, useEffect, useRef } from "react";
import { useMedia } from "use-media";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CardItem,
  Navbar,
  MapCompany,
  useGeolocation,
  TextInputMobile,
} from "../../../component";
import "../CompanyMobile/companyMobile.css";




const CompanyMobile = (props) => {
  const {data, loadingCompany }                          = useSelector((s) => s.GetCompany);
  const [nearby, setNearby]                               = useState("");
  const [modal, setModal]                                 = useState(false);
  const history                                           = useHistory();
  const isMobile                                          = useMedia({ minWidth: "768px" });

  useEffect(() => {
    if (window.innerWidth > 767) return history.replace("/company");
  }, []);

  useEffect(() => {
    if (!modal) setModal(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <>
      <div className={"map"}>
        <div className="navigation">
          <Navbar />
          <div  onClick={() => history.push(`/m/company/list/`)} className="search-here">
            <p className="title-search">Search location</p>
          </div>
        </div>
        <div className="map-mobile">
          <MapCompany map_id={data.map_id} nearby={nearby} />
        </div>
      </div>

    </>
  );
};

export default CompanyMobile;

