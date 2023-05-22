import { useState } from "react";
import { inputEmailProps, inputPasswordProps } from "../utils/inputsPropsConstants";
import { Link} from "react-router-dom";
import Login from "./Login";

function Register() {
  // стейт переменная, хронит значение электронной почты
  const [email, setEmail] = useState("");

  // стейт переменная, хронит значение пароля
  const [password, setPassword] = useState("");

  // обновляем стейт переменную электронной почты при заполнении инпута
  function handleChangeEmailInput(e) {
    return setEmail(e.target.value);
  }

  // обновляем стейт переменную пароля при заполнении инпута
  function handleChangePasswordInput(e) {
    return setPassword(e.target.value);
  }

  return (
    <section className="userdata">
      <h1 className="userdata__title">Регистрация</h1>
      <form className="form">
      <input
        className={`userdata__input form__input form__input_${inputEmailProps.classTag}`}
        id={inputEmailProps.id}
        name={inputEmailProps.inputName}
        type={inputEmailProps.type}
        placeholder={inputEmailProps.placeholder}
        minLength={inputEmailProps.minLength}
        maxLength={inputEmailProps.maxLength}
        value={email || ''}
        onChange={handleChangeEmailInput}
        required
      />
        <input
        className={`userdata__input form__input form__input_${inputPasswordProps.classTag}`}
        id={inputPasswordProps.id}
        name={inputPasswordProps.inputName}
        type={inputPasswordProps.type}
        placeholder={inputPasswordProps.placeholder}
        minLength={inputPasswordProps.minLength}
        maxLength={inputPasswordProps.maxLength}
        value={password || ''}
        onChange={handleChangePasswordInput}
        required
      />

      <button className="button userdata__button">Зарегистрироваться</button>
      </form>
    
      <p className="userdata__question">Уже зарегистрированы? <Link to="/sign-in" className="userdata__question-link">Войти</Link></p>
   
      

      {/* <input className="form__input login__input" value={email || ''} onChange={handleChangeEmailInput}/> */}
      {/* <input className="form__input login__input" value={password || ''} onChange={handleChangePasswordInput} /> */}


    </section>
  );
}

export default Register;
