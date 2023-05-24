import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createColor,
  getColor,
  updateColor,
  resetState
} from "../features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = yup.object().shape({
  title: yup.string().required("Cor Obrigatório!"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.colors);
  const { isSuccess, isError, isLoading, createdColor, updatedColor, colorId } =
    newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Cor adicionada com Sucesso!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Cor atualizada com Sucesso!");
      navigate("/admin/list-colors");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorId || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getColorId !== undefined ? "Editar" : "Adicionar"} Cor </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Definir Cor"
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
            {getColorId !== undefined ? "Editar" : "Adicionar"} Cor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
