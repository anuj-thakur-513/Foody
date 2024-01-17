import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [loginButton, setLoginButton] = useState(false);

  const data = useContext(UserContext);

  const loginClickListener = () => {
    setLoginButton(!loginButton);
  };

  return (
    <div className="flex justify-between shadow-md">
      <div className="logo-container">
        <img className="w-28" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="px-4">
            <Link to={"/about"}>About Us</Link>
          </li>
          <li className="px-4">
            <Link to={"/contact"}>Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li className="px-4">
            <Link to={"/cart"}>Cart</Link>
          </li>
          <button className="px-4" onClick={loginClickListener}>
            {loginButton === false ? "Login" : "Logout"}
          </button>
          <li className="px-4 font-semibold">{data.loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
