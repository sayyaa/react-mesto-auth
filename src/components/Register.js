import { useState } from "react";
import {
  inputEmailProps,
  inputPasswordProps,
} from "../utils/inputsPropsConstants";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  // используем "управляемые компоненты"
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // все ивенты в форме сохраняются в стейт переменную
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  // при сабмите формы информация отправляется на сервера, при положительном ответе открывается попап статуса регистрации и пользователь перенаправляется на страницу входа

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(email, password);
  };

  return (
    <section className="userdata">
      <h1 className="userdata__title">Регистрация</h1>
      <form className="form" autocomplete="off" onSubmit={handleSubmit}>
        <input
          className={`userdata__input form__input form__input_${inputEmailProps.classTag}`}
          id={inputEmailProps.id}
          name={inputEmailProps.inputName}
          type={inputEmailProps.type}
          placeholder={inputEmailProps.placeholder}
          minLength={inputEmailProps.minLength}
          maxLength={inputEmailProps.maxLength}
          value={formValue.email || ""}
          onChange={handleChange}
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
          value={formValue.password || ""}
          onChange={handleChange}
          required
        />

        <button className="button userdata__button" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <p className="userdata__question">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="userdata__question-link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
