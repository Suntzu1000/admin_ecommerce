import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { createCategory } from "../features/pcategory/pcategorySlice";

let userSchema = yup.object().shape({
  title: yup.string().required("Nome de Categoria Obrigatório!"),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Marca adicionada com Sucesso!");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdCategory]);

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-category");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Categoria </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Adicionar Categoria"
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            Add Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
