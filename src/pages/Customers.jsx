import React, { useEffect } from "react";

import { Table } from "antd";
import { useDispatch } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

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
    key: i + 1,
    name: `Jambrolão`,
    email: `gabrielfootze@gmail.com`,
    mobile: `ticaracatica`,
  });
}

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers)
  }, [])
  return (
    <div>
      <h3 className="mb-4 title">Clientes</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;