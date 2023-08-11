import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Nome de Produto",
    dataIndex: "name",
  },
  {
    title: "Marca",
    dataIndex: "brand",
  },
  {
    title: "Quantidade",
    dataIndex: "count",
  },
  {
    title: "Cor",
    dataIndex: "color",
  },
  {
    title: "Quantia",
    dataIndex: "amount",
  },

  {
    title: "Ação",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);
  
  const orderStates = useSelector((state) => state?.auth?.singleOrder);
  const data1 = [];
  for (let i = 0; i < orderStates?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderStates?.orderItems?.product.title,
      brand: orderStates?.orderItems?.product.brand,
      count: orderStates?.orderItems?.count,
      amount: orderStates?.orderItems?.price,
      color: orderStates?.orderItems?.color?.title,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
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
      <h3 className="mb-4 title">Ver Pedido</h3>
      <div>
    <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
