import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faCalendarXmark } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="Imdb logo"
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span className="popular">
            Trending{" "}
            <span>
              <FontAwesomeIcon icon={faFire} style={{ color: "#FFD43B" }} />
            </span>
          </span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span className="topRated">
            Highest Rated{" "}
            <span>
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                style={{ color: "#4169e1" }}
              />
            </span>
          </span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span className="upcoming">
            Coming Soon{" "}
            <span>
              <FontAwesomeIcon
                icon={faCalendarXmark}
                style={{ color: "#ffa500" }}
              />
            </span>
          </span>
        </Link>
      </div>
      <div className="headerRight">
        <Link to="/Wishlist" style={{ textDecoration: "none" }}>
          <span className="wishlist">
            Wishlist{" "}
            <span>
              <FontAwesomeIcon icon={faHeart} style={{ color: "#008000" }} />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
