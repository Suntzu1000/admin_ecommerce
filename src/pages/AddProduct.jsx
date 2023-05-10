import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";

let userSchema = yup.object().shape({
  title: yup.string().required("Título Obrigatório!"),
  description: yup.string().required("Descrição Obrigatório!"),
  price: yup.number().required("Preço Obrigatório!"),
  brand: yup.string().required("Marca Obrigatório!"),
  category: yup.string().required("Categoria Obrigatório!"),
  quantity: yup.number().required("Categoria Obrigatório!"),
  color: yup.array().min(1, "Escolha pelo menos uma cor").required("Cor Obrigatório!"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [brand]);

  const brandState = useSelector((state) => state.brand.brands);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);
  const colorState = useSelector((state) => state.colors.colors);

  const colors = [];
  colorState.forEach((i) => {
    colors.push({
      label: i.title,
      value: i._id,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
  }, [color]);
  const handleColors = (e) => {
    setColor(e);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Produtos </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column "
        >
          <CustomInput
            type="text"
            label=" Título "
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Preço de Produto"
            name="price"
            onCh={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select name="" className="form-control py-3 mb-3 " id="">
            <option value="">Selecionar Marca</option>
            {brandState.map((i, j) => {
              return (
                <option value={i.title} key={j}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select name="" className="form-control py-3 mb-3 " id="">
            <option value=""> Selecionar Categoria do Produto</option>
            {pCategoryState.map((i, cat) => {
              return (
                <option value={i.title} key={cat}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Selecionar Cores"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={colors}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Quantidade de Produtos"
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
            <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            Add Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
