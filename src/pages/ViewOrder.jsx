import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUserId } from "../features/auth/authSlice";
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
    title: "Data",
    dataIndex: "date",
  },

  {
    title: "Ação",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUserId(userId));
  }, [dispatch, userId]);
  
  const orderStates = useSelector((state) => state.auth.orderbyuser.products);
  console.log(orderStates);
  const data1 = [];
  for (let i = 0; i < orderStates.length; i++) {
    data1.push({
      key: i + 1,
      name: orderStates[i].product.title,
      brand: orderStates[i].product.brand,
      count: orderStates[i].count,
      amount: orderStates[i].product.price,
      color: orderStates[i].product.color,
      date: orderStates[i].product.createdAt,
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
