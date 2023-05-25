import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  createNewBlogCat,
  getBlogCat,
  resetState,
  updateBlogCat,
} from "../features/bcategory/bcatSlice";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = yup.object().shape({
  title: yup.string().required("Categoria Obrigatório!"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    blogCatName,
    updatedBCategory,
  } = newBlogCategory;
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlogCat(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Adicionado com Sucesso!");
    }
    if (isSuccess && updatedBCategory) {
      toast.success("Atualizado com Sucesso!");
      navigate("/admin/blog-category-list/");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    updatedBCategory,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      const data = { id: getBlogId, blogCatData: values };
      if (getBlogId !== undefined) {
        dispatch(updateBlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewBlogCat(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Editar" : "Adicionar"} Categoria de Blog{" "}
      </h3>
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
            {getBlogId !== undefined ? "Editar" : "Adicionar"} Categoria de Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
