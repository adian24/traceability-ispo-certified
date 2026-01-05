import React from "react";
import { Link } from "react-router-dom";
import "./categoryBar.css";
import { food, hotel, office, pom } from "../../../assets";

const CategoryBar = ({ activeCategory = "company" }) => {
  return (
    <div className="category-bar-float">
      <Link
        to="/hotel"
        className={`category-item !no-underline ${activeCategory === "hotel" ? "active" : ""}`}
      >
        <img src={hotel} alt="Hotel" />
        <span>Hotel</span>
      </Link>

      <Link
        to="/restaurant"
        className={`category-item !no-underline ${activeCategory === "restaurant" ? "active" : ""}`}
      >
        <img src={food} alt="Restaurant" />
        <span>Restaurant</span>
      </Link>

      <Link
        to="/company"
        className={`category-item !no-underline ${activeCategory === "company" ? "active" : ""}`}
      >
        <img src={office} alt="Company" />
        <span>Company</span>
      </Link>

      <Link
        to="/spbu"
        className={`category-item !no-underline ${activeCategory === "spbu" ? "active" : ""}`}
      >
        <img src={pom} alt="SPBU" />
        <span>SPBU</span>
      </Link>
    </div>
  );
};

export default CategoryBar;
