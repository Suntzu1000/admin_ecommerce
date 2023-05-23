import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  createBrand,
  getABrand,
  updateBrand,
} from "../features/brand/brandSlice";
import { useFormik } from "formik";
import { resetState } from "../features/blogs/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = yup.object().shape({
  title: yup.string().required("Nome de Marca Obrigatório!"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(
    (values) => {
      if (getBrandId !== undefined) {
        dispatch(getABrand(getBrandId));
      } else {
        dispatch(resetState());
      }
    },
    [getBrandId, dispatch]
  );

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Marca adicionada com Sucesso!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Atualizado com Sucesso!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, navigate, updatedBrand]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">
        {getBrandId !== undefined ? "Editar" : "Adicionar"} Marca
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Definir Marca"
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            {getBrandId !== undefined ? "Editar" : "Adicionar"} Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
