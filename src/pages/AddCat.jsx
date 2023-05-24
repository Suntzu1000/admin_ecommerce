import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createCategory,
  getProductCategory,
  resetState,
  updateProductCategory,
} from "../features/pcategory/pcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = yup.object().shape({
  title: yup.string().required("Nome de Categoria Obrigatório!"),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Categoria adicionada com Sucesso!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Categoria Atualizada com Sucesso!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  })

  return (
    <div>
      <h3 className="mb-4 title">
        {getPCatId !== undefined ? "Edit" : "Add"} Categoria
      </h3>
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
           {getPCatId !== undefined ? "Edit" : "Add"} Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
