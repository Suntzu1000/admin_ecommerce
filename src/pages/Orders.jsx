import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrder } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "NOME",
    dataIndex: "firstname",
  },

  {
    title: "Produto",
    dataIndex: "products",
  },
  {
    title: "Valor",
    dataIndex: "valor",
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
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const updateOrderStatus = (a, b) => {
    dispatch(updateOrder({ id: a, status: b }));
  };

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      firstname: orderState[i]?.user?.firstname,
      products: <Link to={`/admin/order/${orderState[i]}`}>Ver Pedidos</Link>,
      valor: orderState[i]?.totalPrice,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) =>
              updateOrderStatus(orderState[i]?._id, e.target.value)
            }
            id=""
            className="form-control form-select"
          >
            <option value="Pedido" disabled>
              Pedido
            </option>
            <option value="Processando">Processando</option>
            <option value="Enviado">Enviado</option>
            <option value="Saiu para Entrega">Saiu para Entrega</option>
            <option value="Entrega">Entregado</option>
          </select>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Pedidos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
