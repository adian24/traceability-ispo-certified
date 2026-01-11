import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { food, hotel, office, pom, ikonsawit } from "../../../assets";
import { logout } from "../../../config/services";
import { auth } from "../../../config/services";

const Navbar = () => {
  const [sidebar, setSidebar]   = useState(false);
  const [ loading, setLoading ] = useState(false);
  const showSidebar             = () => setSidebar(!sidebar);
  const history                 = useHistory();
  const authenticate            = auth.currentUser;

  // console.log('authenticate',authenticate)

  async function handleLogOut() {
    setLoading(true)
    try{
      await logout();
      history.push("/")    
    } catch {
      alert("error")
    }
  }

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <i className="fas fa-bars text-dark" onClick={showSidebar}></i>
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active shadow" : "nav-menu"}>
        <ul className="nav-menu-items ml-2">
          <li style={{ marginTop: 10, marginBottom: 30 }} onClick={showSidebar}>
            <Link to="#">
              <i
                className="fas fa-times text-dark"
                style={{ fontSize: 20,position:'absolute', right: 0, right: 20 }}
              ></i>
            </Link>
          </li>
          <li style={{ marginLeft: -43, marginBottom: 30, marginTop: 20 }}>
            <Link to="/">
              <img
                alt="label map logo"
                className="mr-1 mb-2"
                src={ikonsawit}
                width={65}
              /> 
            </Link>
          </li>
          <li style={{ marginLeft: -33, marginBottom: 20, marginTop: 20}}>
          
            <Link to="/hotel" style={{color:'black', fontFamily:'Poppins', fontSize:14}}>
              <img
                alt="logo hotel"
                className="mr-1 mb-2"
                src={hotel}
                height={40}
                width={40}
              /> Hotel
            </Link>
            
          </li>
          <li style={{ marginLeft: -33, marginBottom: 20 }}>
            <Link to="/restaurant" style={{color:'black', fontFamily:'Poppins', fontSize:14}}>
              <img
                alt="logo restoran"
                className="mr-1 mb-2"
                src={food}
                height={40}
                width={40}
              /> Restaurant
            </Link>
          </li>
          {/* <li style={{ marginLeft: -33, marginBottom: 30 }}>
            <Link to="/SPBU">
              <img alt="logo SPBU" className="mr-1 mb-2" src={pom} height={45} width={45} />
            </Link>
          </li> */}
          <li style={{ marginLeft: -33, marginBottom: 20 }}>
            <Link to="/company" style={{color:'black', fontFamily:'Poppins', fontSize:14}}>
              <img
                alt="logo company"
                className="mr-1 mb-2"
                src={office}
                height={40}
                width={40}
              /> Company
            </Link>
          </li>

          <li style={{marginLeft: -40, display: authenticate == null ? 'none' : ''  }}>
            <div onClick={handleLogOut}  style={{display: "flex", marginLeft: 15, bottom: 0, position: "relative", cursor: "pointer"}}>
              <i className="fas fa-sign-out-alt" style={{marginTop: 0, fontSize: 25}}/>
              <p style={{marginLeft: 15}}>Logout</p>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
