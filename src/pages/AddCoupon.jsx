import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCoupon, resetState } from "../features/coupon/couponSlice";

let userSchema = yup.object().shape({
  name: yup.string().required("Nome de Cupom Obrigatório!"),
  expiry: yup.date().required("Data de Expiração Obrigatório!"),
  discount: yup.number().required("Desconto Obrigatório!"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Cupom adicionado com Sucesso!");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdCoupon]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Cupom </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Definir Cupom"
            name="name"
            onCh={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="date"
            label="Definir Data de Expiração"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            id="expiry"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput
            type="number"
            label="Definir Desconto"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            Add Cupom
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
