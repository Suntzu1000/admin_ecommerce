import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Título",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,

  },
  {
    title: "Ação",
    dataIndex: "action",
  },
];


const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: pCategoryState[i].title,
      action: (
        <>
          <Link to="/" className="fs-3 ">
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
      <h3 className="mb-4 title">Categorias</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default CategoryList;
