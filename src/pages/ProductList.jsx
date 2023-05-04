import React, { useEffect } from "react";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
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
    title: "Categoria",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Preço",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,

  },
  {
    title: "Marca",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,

  },
  {
    title: "Cores",
    dataIndex: "color",
    sorter: (a, b) => a.color.length - b.color.length,

  },
  {
    title: "Ação",
    dataIndex: "action",
    
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      price: `R$ ${productState[i].price}`,
      brand: productState[i].brand,
      color: productState[i].color,
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
      <h3 className="mb-4 title">Lista de Produtos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
