import logo from "../assets/svg/logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="src/components/App#">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
