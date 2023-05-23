import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { getBrands } from "../features/brand/brandSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "TÍTULO",
    dataIndex: "title",
  },
  {
    title: "Ação",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,
      action: (
        <>
          <Link to={`/admin/brand/${brandState[i]._id}`} className="fs-3 ">
            <FiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/" >
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Marcas</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BrandList;
