import logo from "../assets/svg/logo.svg";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function Header({ userEmail, setUserEmail, setLoggedIn }) {

  const navigate = useNavigate();

  // функция выхода из аккаунта, удаляет jwt токен из локального хранилища
  const logOut = () => {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false)
    navigate("/sign-in", {replace: true})
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </Link>
      <div className="header__info-wrapper">
        <p className="header__email">{userEmail}</p>

        <Routes>
          <Route path="/" element={<Link to="/sign-in" className="header__link" onClick={logOut}>
              Выйти
            </Link>} />
            
            <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">
              Зарегистрироваться
            </Link>} />
            <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">
              Войти
            </Link>} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;

