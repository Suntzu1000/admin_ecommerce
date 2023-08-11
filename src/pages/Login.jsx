import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";


let userSchema = yup.object().shape({
    email: yup.string()
      .email("Email Deve Ser Válido")
      .required("Email Obrigatório!"),
    password: yup.string().required("Senha Obrigatória!"),
  });
  
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message, navigate]);


  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  

  return (
    <div className="py-4" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 ">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Entre na sua conta para continuar</p>
        <div className="error text-center">
          {message.message === "Obrigatório" ? "Você não é um Admin!" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="E-mail"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Senha"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 "
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
