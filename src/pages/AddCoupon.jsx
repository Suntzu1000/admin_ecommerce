import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = yup.object().shape({
  name: yup.string().required("Nome de Cupom Obrigatório!"),
  expiry: yup.date().required("Data de Expiração Obrigatório!"),
  discount: yup.number().required("Desconto Obrigatório!"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [day, month, year ].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Cupom Adicionado com Sucesso!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Cupom Atualizado com Sucesso!");
      navigate("/admin/coupon-list")
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error("Algo deu errado!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
     if(getCouponId !== undefined){
      const data = {id: getCouponId, couponData: values, }
      dispatch(updateCoupon(data))
      dispatch(resetState())
     } else{
      dispatch(createCoupon(values));
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
        {getCouponId !== undefined ? "Editar" : "Adicionar"} Cupom
      </h3>
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
            {getCouponId !== undefined ? "Editar" : "Adicionar"} Cupom
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
