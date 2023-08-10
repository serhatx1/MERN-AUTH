import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import "./Navbar.css";
import { AiOutlineMenu } from "react-icons/ai";
import axios from "axios";
export const Navbar = () => {
  const { user,setUser } = useContext(UserContext);
  const [active, setActive] = useState("");
  const handLogOut = function (e) {
    e.preventDefault()
    axios.post("/logout", (a) => {
      console.log(a);
    });
    setUser("")
   

  };
  useEffect(() => {
    const icon = document.querySelector(".menuIcon");
    const authSection = document.querySelector(".authContainer");

    const handleClick = (e) => {
      if (active === "active") {
        console.log("Clicked on:", e.target);
        if (!icon.contains(e.target) && !authSection.contains(e.target)) {
          setActive("");
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [active]);

  const handleClick = function () {
    if (active == "") {
      setActive("active");
    } else {
      setActive("");
    }
  };

  return (
    <div className="navContainer">
      <div className="logoContainer">
        <NavLink to={"/"}>
          <img src="./logo.png" alt="" />
        </NavLink>
      </div>
      <div className="menuIcon" onClick={handleClick}>
        <AiOutlineMenu />
      </div>

      <div className={`authContainer ${active}`}>
        <NavLink className={"button"} to="/">
          Home
        </NavLink>
        {!user && (
          <NavLink className={"button"} to="/login">
            Login
          </NavLink>
        )}
        {!user && (
          <NavLink className={"button register"} to="/register">
            Sign up
          </NavLink>
        )}
        {user && (
          <NavLink onClick={handLogOut} className={"button"} to="/logout">
            Log out
          </NavLink>
        )}
      </div>
    </div>
  );
};
