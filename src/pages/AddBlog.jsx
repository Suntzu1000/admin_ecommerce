import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createBlog, getBlog, resetState, updateBlog } from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcatSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = yup.object().shape({
  title: yup.string().required("Título Obrigatório!"),
  description: yup.string().required("Descrição Obrigatório!"),
  category: yup.string().required("Categoria Obrigatório!"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bcategory.bCategories);
  const blogState = useSelector((state) => state.blogs);
  const {
    isSuccess,
    isError,
    isLoading,
    createdblogs,
    updatedBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
  } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
      img.push(getBlogId)
    } else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdblogs) {
      toast.success("Blog Adicionado com Sucesso!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Atualizado com Sucesso!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdblogs, updatedBlog, navigate]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data))
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">
        {getBlogId !== undefined ? "Editar" : "Adicionar"} Blog
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Dígite o título do Blog"
              name="title"
              onCh={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            className="form-control py-3 mt-3 "
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            id="category"
          >
            <option value=""> Selecione a Categoria do Blog </option>
            {bCatState.map((i, cat) => {
              return (
                <option value={i.title} key={cat}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            name="description"
            className="mt-3"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Arraste e solte alguns arquivos aqui ou clique para
                      selecionar os arquivos!
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap mt-3 gap-3 ">
            {imgState.map((i, v) => {
              return (
                <div
                  className="position-relative d-flex flex-wrap gap-3"
                  key={v}
                >
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute "
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            {getBlogId !== undefined ? "Editar" : "Adicionar"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
