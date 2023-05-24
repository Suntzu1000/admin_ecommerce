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
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Descrição",
    dataIndex: "description",
  },
  {
    title: "Categoria",
    dataIndex: "category",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  const BlogState = useSelector((state) => state.blogs.blogs);
  const data1 = [];
  for (let i = 0; i < BlogState.length; i++) {
    data1.push({
      key: i + 1,
      title: BlogState[i].title,
      description: BlogState[i].description,
      category: BlogState[i].category,
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
