import React from "react";
import "./cardItem.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from "react-redux";

const CardItem = ({
  name,
  location,
  images,
  map_id,
  rating,
  facility,
  ...rest
}) => {
  const { loading } = useSelector((state) => state.GetHotel);

  return (
    <>
      <div {...rest} style={{ cursor: "pointer", padding: '10px' }}>
        <div
          className="d-flex justify--start name-detail"
          style={{
            fontSize: 17,
            fontWeight: '500',
            // marginTop: '3ex',
            marginLeft: 15,
            fontFamily: "Poppins",
            marginRight: 10,
          }}
        >
          {name}
        </div>
        <div
          className="text-dark"
          style={{ marginLeft:'15px', marginRight:'15px'}}
        >
          <i
            className="fas fa-map-marker-alt loc-detail "
            style={{ color: "#aaa", fontSize: 18, marginRight: 30 }}
          >
            <div
              className="d-flex justify--start name-detail"
              style={{
                fontSize: 14,
                fontWeight: '400',
                marginLeft: 20,
                fontFamily: "Poppins",
                textAlign:'justify',
                marginTop: -18,
              }}
            >
              {location}
            </div>
          </i>
        </div>
        {/* <hr /> */}
      </div>
    </>
  );
};

export default CardItem;
