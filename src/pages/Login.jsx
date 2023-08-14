import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import Header from "../components/Header";


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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header heading="Login" paragraph="Entre na sua conta para continuar" />
      <div className="bg-white rounded-md p-6 shadow-lg w-96">
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="E-mail"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
          <CustomInput
            type="password"
            name="password"
            label="Senha"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
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




/*import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import Header from "../components/Header"; 

let userSchema = yup.object().shape({
  email: yup
    .string()
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
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { message } = authState.auth; 

  useEffect(() => {
    if (message === "Obrigatório") {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [message, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header heading="Login" paragraph="Entre na sua conta para continuar" />
      <div className="bg-white rounded-md p-6 shadow-lg w-96">
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="E-mail"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
          <CustomInput
            type="password"
            name="password"
            label="Senha"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;*/ 
