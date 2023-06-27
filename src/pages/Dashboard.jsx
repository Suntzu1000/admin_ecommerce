import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "NAME",
    dataIndex: "name",
  },
  {
    title: "Produto",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Jambrolhão ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthLyDateState = useSelector((state) => state?.auth?.monthlyData);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyData());
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
  }, [monthLyDateState]);

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
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 ">
          <div>
            <p className="desc">Total</p>
            <h4 className="subtitle">R$ 10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Comparado com abril</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 ">
          <div>
            <p className="mb-0 desc">Total</p>
            <h4 className="subtitle">R$ 10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Comparado com abril</p>
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
            <p className="mb-0 desc">Comparado com abril</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4">
          <h3 className="mb-5 title">Estatísticas de Renda</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-5 title">Estatísticas de Renda</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Pedidos Recentes</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
