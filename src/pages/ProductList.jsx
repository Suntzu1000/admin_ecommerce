import React from "react";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import {AiFillDelete} from "react-icons/ai"

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
    name: `Jambrolão ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const ProductList = () => {
  return (
    <div>
      <h3 className="mb-4 title">Lista de Produtos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
