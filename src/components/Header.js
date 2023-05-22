import logo from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </Link>
    </header>
  );
}

export default Header;
