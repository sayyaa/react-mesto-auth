import { useState } from "react";
import {
  inputEmailProps,
  inputPasswordProps,
} from "../utils/inputsPropsConstants";

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;

    // если функция отрабатывает как надо, сбрасываем инпут
    if (onLogin(email, password)) {
      setFormValue({ email: "", password: "" });
    }
  };

  return (
    <section className="userdata">
      <h1 className="userdata__title">Вход</h1>
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
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
