import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ISO1, ISO3, ISO4 } from "../../../assets";

const MyModal = ({ name, logo, audit, valid }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="ml-4">
        <Button
          className="button-modal"
          style={{ background: "#001C54", border: "#001C54" }}
          onClick={handleShow}
        >
          Certification
        </Button>
      </div>
      <Modal
        className="text-center"
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Certification</Modal.Title>
        </Modal.Header>
        detailplace
        <Modal.Body>
          <div>
            <h5 className="text-dark">{name}</h5>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              id="carouselExampleCaptions"
              className="carousel slide w-75"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner ">
                <div className="carousel-item active">
                  <img src={ISO1} className="d-block w-100" alt="ISO" />
                  <p className="text-dark mt-2">Valid : 23 Agustus 2023</p>
                </div>
                <div className="carousel-item">
                  <img src={ISO3} className="d-block w-100" alt="ISO" />
                  <p className="text-dark mt-2">Valid : 23 Agustus 2023</p>
                </div>
                <div className="carousel-item">
                  <img src={ISO4} className="d-block w-50" alt="ISO" />
                  <p className="text-dark mt-2">Valid : 23 Agustus 2023</p>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon rounded"
                  aria-hidden="true"
                  style={{ color: "black", backgroundColor: "black" }}
                ></span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon rounded"
                  aria-hidden="true"
                  style={{ color: "black", backgroundColor: "black" }}
                ></span>
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;
