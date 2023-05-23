import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { getCoupon } from "../features/coupon/couponSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Desconto",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Vencimento",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Ação",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupon());
  }, []);
  const CouponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < CouponState.length; i++) {
    data1.push({
      key: i + 1,
      name: CouponState[i].name,
      discount: CouponState[i].discount,
      expiry: new Date(CouponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link to="/" className="fs-3 ">
            <FiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Cupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default CouponList;
