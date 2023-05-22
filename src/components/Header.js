import logo from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </Link>
      <div className="header__info-wrapper">
      <p className="header__email">email@ya.ru</p>
      <Link to='/' className="header__link">Региливойти</Link>
      </div>

    </header>
  );
}

export default Header;
