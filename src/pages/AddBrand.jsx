import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCat = () => {
  return (
    <div>
      <h3 className="mb-4">Add Marca </h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Acessar Marca" />
          <button
            className="btn btn-success border-0 rounded-3 my-5 "
            type="submit"
          >
            Add Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
