import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";
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
  },
  {
    title: "Ação",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);
  const BlogState = useSelector((state) => state.blogs.blogs);
  const data1 = [];
  for (let i = 0; i < BlogState.length; i++) {
    data1.push({
      key: i + 1,
      title: BlogState[i].title,
      category: BlogState[i].category,
      action: (
        <>
          <Link className=" fs-3" to={`/admin/add-blog/${BlogState[i].id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(BlogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteABlog = (e) => {
    dispatch(deleteBlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Lista de Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteABlog(blogId);
        }}
        title="Tem certeza que deseja deletar este Blog?"
      />
    </div>
  );
};

export default BlogList;
