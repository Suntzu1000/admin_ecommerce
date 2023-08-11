import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../features/auth/authSlice";
import { useMemo } from "react";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "NOME",
    dataIndex: "name",
  },
  {
    title: "CONTAGEM DE PRODUTOS",
    dataIndex: "product",
  },
  {
    title: "PREÇO TOTAL",
    dataIndex: "price",
  },
  {
    title: "PREÇO TOTAL PÓS DESCONTO",
    dataIndex: "dprice",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthLyDateState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDateState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
  const config3 = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${
          getTokenFromLocalStorage !== null
            ? getTokenFromLocalStorage.token
            : ""
        }`,
        Accept: "application/json",
      },
    }),
    [getTokenFromLocalStorage]
  );


  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthLyDateState?.length; index++) {
      const element = monthLyDateState[index];
      data.push({
        type: monthNames[element?._id?.month],
        Renda: element?.count,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        Vendas: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i ,
        name: orderState[i]?.user?.firstname + orderState[i]?.user?.lastname,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
      });
    }
    setOrderData(data1);
  }, [monthLyDateState, orderState]);
  const config2 = {
    data: dataMonthly,
    xField: "type",
    yField: "Renda",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Mês",
      },
      sales: {
        alias: "Renda",
      },
    },
  };

  const config = {
    data: dataMonthlySales,
    xField: "type",
    yField: "Venda",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Mês",
      },
      sales: {
        alias: "Vendas",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title ">Dashboard</h3>
      <div className="d-flex p-3 justify-content-between align-items-center gap-3">
        <div className="d-flex  justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 ">
          <div>
            <p className="desc">Renda Total</p>
            <h4 className="subtitle">
              R$ {yearlyDateState && yearlyDateState[0]?.amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Renda Total Anual</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 ">
          <div>
            <p className="mb-0 desc">Vendas Totais</p>
            <h4 className="subtitle">
              R$ {yearlyDateState && yearlyDateState[0]?.amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Venda Do Último Ano</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 ">
          <div>
            <p className="mb-0 desc">Total</p>
            <h4 className="subtitle"> R$ 10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Total Anualmente</p>
          </div>
        </div>
      </div>
      <div className="d-flex p-3 justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50 ">
          <h3 className="mb-5 title">Estatísticas de Renda</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50 ">
          <h3 className="mb-5 title">Estatísticas de Renda</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Pedidos Recentes</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
