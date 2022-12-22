import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./registerPage.css";
import services from "../../services/services";

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log("from>>>", form);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await services.registerService({ ...form });
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="auth-page">
          <h3>Регистрация</h3>
          <form className="from form-login" onSubmit={registerHandler}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  name="email"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  name="password"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className="row">
              <button
                type="submit"
                className="wawes-effect wawes-ligth btn blue"
              >
                Регистрация
              </button>
              <Link to="/login" className="btn-outline btn-reg">
                Уже есть аккаунт ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
