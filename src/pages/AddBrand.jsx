import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createBrand } from "../features/brand/brandSlice";
import { useFormik } from "formik";

let userSchema = yup.object().shape({
  title: yup.string().required("Nome de Marca Obrigatório!"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand } = newBrand;

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Marca adicionada com Sucesso!");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdBrand]);

  const formik = useFormik({
    initialValues: {
      brand: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-brand");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Marca </h3>
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
            Add Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
