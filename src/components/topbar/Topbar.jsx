import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`top ${menuOpen && "active"}`}>
      <div className="topLeft">
        <div className="menuIcon" onClick={toggleMenu}>
          <div className="menuLine"></div>
          <div className="menuLine"></div>
          <div className="menuLine"></div>
        </div>
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className={`topCenter ${menuOpen && "menuOpen"}`}>

        <ul className="topList">
          <li className="topListItem" onClick={closeMenu}>
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem" onClick={closeMenu}>
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem" onClick={closeMenu}>
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem" onClick={closeMenu}>
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings" onClick={closeMenu}>
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem" onClick={closeMenu}>
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem" onClick={closeMenu}>
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
