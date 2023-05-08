import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Título",
    dataIndex: "title",
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

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  });
  const BlogState = useSelector((state) => state.blogs.blogs);
  const data1 = [];
  for (let i = 0; i < BlogState.length; i++) {
    data1.push({
      key: i + 1,
      title: BlogState[i].title,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Lista de Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogList;
