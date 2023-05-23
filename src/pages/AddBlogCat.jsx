import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createNewBlogCat, resetState } from "../features/bcategory/bcatSlice";
import { useFormik } from "formik";

let userSchema = yup.object().shape({
  title: yup.string().required("Categoria Obrigatório!"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const newBlogCategory = useSelector((state) => state.bcategory);
  const { isSuccess, isError, isLoading, createdBlogCategory } =
    newBlogCategory;

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Adicionado com Sucesso!");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdBlogCategory]);

  const formik = useFormik({
    initialValues: {
      BlogCategory: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createNewBlogCat(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog por Categoria </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Definir Categoria de Blog"
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
