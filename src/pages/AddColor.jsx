import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { createColor } from "../features/color/colorSlice";

let userSchema = yup.object().shape({
  title: yup.string().required("Cor Obrigatório!"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.colors);
  const { isSuccess, isError, isLoading, createdColor } = newColor;

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Cor(es) adicionada com Sucesso!");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  const formik = useFormik({
    initialValues: {
      color: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-colors");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Cores </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Definir Cores"
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            Add Cores
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
