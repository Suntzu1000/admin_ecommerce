import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  getEnquiries,
  resetState,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "NOME",
    dataIndex: "name",
  },
  {
    title: "EMAIL",
    dataIndex: "email",
  },
  {
    title: "Telefone",
    dataIndex: "mobile",
  },
  {
    title: "Comentário",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Ação",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const enqState = useSelector((state) => state.enquiry.enquiries);

  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      comment: enqState[i].comment,
      status: (
        <>
          <select name="" id="" className="form-control form-select">
            <option value="">Definir Status</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3"
            to={`/admin/enquiries/${enqState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enqState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteEnq = (e) => {
    dispatch(deleteEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Informações</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
