import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./DivRute.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { food, hotel, office, pom, ikonsawit } from "../../../assets";
import { logout } from "../../../config/services";
import { auth } from "../../../config/services";
import { Modal, Button } from "react-bootstrap";

const DivRute = () => {
  const [sidebar, setSidebar]         = useState(false);
  const [loading, setLoading ]        = useState(false);
  const [showDiv, setShowDiv]         = useState();
  const [myLocation, setMyLocation]   = useState();
  const showSidebar                   = () => setSidebar(!sidebar);
  const history                       = useHistory();
  const authenticate                  = auth.currentUser;
  const [styleDefaultRoute, setStyleDefaultRoute]             = useState("btn_option_direc_active text-blue");
  const [styleCarRoute, setStyleCarRoute]             = useState("btn_option_direc_non_active text-dark");
  const [styleWalkRoute, setStyleWalkRoute]             = useState("btn_option_direc_non_active text-dark");
  const [styleBycicleRoute, setStyleBycicleRoute]             = useState("btn_option_direc_non_active text-dark");



  async function handleLogOut() {
    setLoading(true)
    try{
      await logout();
      history.push("/")    
    } catch {
      alert("error")
    }
  }

  const onClickMyLocation = () => {
    setMyLocation('My Location')
    // console.log('eeeeeeeeeeee',e)
  }

  const _onFocus = () => {
    setShowDiv(true);
    // setStyle("input-company-active");
  };

  const _onBlur = () => {
    setShowDiv(false);
    // setStyle("input-company");
  };

  return (
    <>
      <div className="sidebardiv">
        <Link to="#" className="menu-bars">
            <Button className="button-rute" onClick={showSidebar}>
              <i className="fas fa-directions" ></i> 
            </Button> 
        </Link>
        <span style={{ fontSize:13, marginLeft: 8 }}>Route</span>
      </div>
      <nav className={sidebar ? "div-menu active shadow" : "div-menu"}>
        <ul className="div-menu-items ml-2">
          
          <li style={{ marginTop: 10, marginBottom: 10 }} >
            <div className="row" style={{ marginLeft:'-4rem' }}>
              <div className="col-md-3">
                <Link to="/">
                  <img
                    alt="label map logo"
                    className="mr-1 mb-2"
                    src={ikonsawit}
                    width={65}
                  /> 
                </Link>
              </div>
              <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                <Button className={styleDefaultRoute} style={{ width:40, borderRadius:'50%',  }} onClick={() => [setStyleDefaultRoute('btn_option_direc_active text-blue'), setStyleCarRoute('btn_option_direc_non_active text-dark'), setStyleWalkRoute('btn_option_direc_non_active text-dark'), setStyleBycicleRoute('btn_option_direc_non_active text-dark')]}>
                  <i className="fas fa-directions " style={{ fontSize: 20, marginLeft: -3.2 }} ></i>
                </Button>
              </div>
              <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                <Button className={styleCarRoute} style={{ width:40, borderRadius:'50%' }} onClick={() => [setStyleDefaultRoute('btn_option_direc_non_active text-dark'), setStyleCarRoute('btn_option_direc_active text-blue'), setStyleWalkRoute('btn_option_direc_non_active text-dark'), setStyleBycicleRoute('btn_option_direc_non_active text-dark')]}>
                  <i className="fas fa-car " style={{ fontSize: 20, marginLeft: -3.2 }} ></i>
                </Button>
              </div>
              <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                <Button className={styleWalkRoute} style={{ width:40, borderRadius:'50%' }} onClick={() => [setStyleDefaultRoute('btn_option_direc_non_active text-dark'), setStyleCarRoute('btn_option_direc_non_active text-dark'), setStyleWalkRoute('btn_option_direc_active text-blue'), setStyleBycicleRoute('btn_option_direc_non_active text-dark')]}>
                  <i className="fas fa-walking " style={{ fontSize: 20, marginLeft: -2 }} ></i>
                </Button>
              </div>
              <div className="col-md-1" style={{ marginTop:5, marginRight: 20 }}> 
                <Button className={styleBycicleRoute} style={{ width:40, borderRadius:'50%' }} onClick={() => [setStyleDefaultRoute('btn_option_direc_non_active text-dark'), setStyleCarRoute('btn_option_direc_non_active text-dark'), setStyleWalkRoute('btn_option_direc_non_active text-dark'), setStyleBycicleRoute('btn_option_direc_active text-blue')]}>
                  <i className="fas fa-bicycle " style={{ fontSize: 20, marginLeft: -5}} ></i>
                </Button>
              </div>
              {/* <div className="col-md-1" style={{ marginTop:'10px', marginRight: 7 }} onClick={showSidebar}> 
                <Link to="#">
                  <i className="fas fa-motorcycle text-dark" style={{ fontSize: 20,position:'absolute', right: 0, right: 20 }}></i>
                </Link>
              </div> */}
              <div className="col-md-2" style={{ marginTop:'10px' }} onClick={showSidebar}> 
                <Link to="#">
                  <i className="fas fa-times text-dark" style={{ fontSize: 20,position:'absolute', right: 0, right: 20 }}></i>
                </Link>
              </div>
            </div>
          </li>

          {/* <li style={{ marginLeft: -43, marginBottom: 30, marginTop: 20 }}>
           
          </li> */}

          <li style={{ marginLeft: -33, marginBottom: 20 }}>
            <div className="row">
              <div className="col-md-1">
                <i className="fas fa-circle icon-lokasi-awal"></i>
              </div>
              <div className="col-md-10 ">
                <input className="form-control" placeholder="Choose first location..." onFocus={_onFocus} onBlur={_onBlur}></input>
              </div>
            </div>
          </li>

          <li style={{ marginLeft: -33, marginBottom: 20 }}>
            <div className="row">
              <div className="col-md-1">
                <i className="fas fa-map-pin icon-tujuan"></i>
              </div>
              <div className="col-md-10 ">
                <input className="form-control" placeholder="Choose direction..." ></input>
              </div>
            </div>
          </li>

          {
            showDiv == true ? <li style={{ marginLeft: -45, marginBottom: -8 }}><hr/></li> : ''         
          }

          {
            showDiv == true ?
            <li style={{ marginLeft: -33, marginBottom: -8}} >
              <div className="row my_location">
                <div className="col-md-1" style={{  }}>
                  <i className="fas fa-street-view icon-my-location"></i>
                </div>
                <div className="col-md-10 ml-2" style={{ lineHeight:'50px',  }}>
                  My Location
                </div>
              </div>
            </li>
            : ''
          } 


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
                <b>22 Km</b> from your location
              </div>
            </div>
          </li>

          <li style={{ marginLeft: -33, marginBottom: -8}}>
            <div className="row" style={{ fontSize:12 }}>
              <div className="col-md-1">
                <i className="fas fa-clock icon-my-location"></i>
              </div>
              <div className="col-md-10 ml-2" style={{ lineHeight:'50px' }}>
                 <b>1</b> Hour <b>25</b> Minues
              </div>
            </div>
          </li>

        </ul>
      </nav>
    </>
  );
};

export default DivRute;
