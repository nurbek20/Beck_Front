import React, { useState, useContext } from "react";
import "./authPage.css";
import services from "../../services/services";
import { MyContext } from "../../context/my-context/my-context";


const AuthPage = () => {
  const { login, IsActive } = useContext(MyContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    IsActive(1);
    try {
      const data = await services.loginService({ ...form });
      console.log(data);
      login(data.data.token, data.data.userId);
      IsActive(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container">
        <div className="auth-page">
          <h3>Авторизация</h3>
          <form className="from form-login" onSubmit={loginHandler}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  name="email"
                  className="validate"
                  id="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  name="password"
                  className="validate"
                  id="email"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
            <div className="row">
              <button className="wawes-effect wawes-ligth btn blue">
                Войти
              </button>
              <span onClick={()=>IsActive(2)} className="btn-outline btn-reg">
                Нет акаунта ?
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
