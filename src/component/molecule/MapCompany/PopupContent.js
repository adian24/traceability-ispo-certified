import React from "react";
import Carousel from "react-elastic-carousel";
import { ISO, ispo, gedung } from "../../../assets";

const PopupContent = ({ label, onDetailClick }) => {
  return (
    <div className="popup-content-wrapper">
      <img
        alt="building"
        className="popup-image"
        src={gedung}
      />

      <div className="popup-body">
        <span className="popup-badge">Company</span>

        <h3 className="popup-title">{label.name}</h3>

        {label.phone1 && (
          <div className="popup-phone">
            <i className="fas fa-phone-alt" />
            <span>{label.phone1}</span>
          </div>
        )}

        {label.certificate && label.certificate.length > 0 ? (
          <div className="popup-certificates">
            <Carousel itemsToShow={1}>
              {label.certificate.map((item) => (
                <div key={item.certificate_id} className="certificate-item">
                  <img
                    alt="certificate"
                    className="certificate-logo"
                    src={ISO}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        ) : null}

        <button
          className="popup-button"
          onClick={() => onDetailClick(label.map_id)}
        >
          More Detail
        </button>
      </div>
    </div>
  );
};

export default PopupContent;
