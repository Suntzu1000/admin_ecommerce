import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

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
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Fev",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Abr",
      sales: 145,
    },
    {
      type: "Mai",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Ago",
      sales: 38,
    },
    {
      type: "Set",
      sales: 38,
    },
    {
      type: "Out",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dez",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
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
        alias: "Estatística",
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
      <div className="mt-4">
        <h3 className="mb-5 title">Estatísticas de Renda</h3>
        <div>
          <Column {...config} />;
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
