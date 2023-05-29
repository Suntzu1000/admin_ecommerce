import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnquiry } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [getEnqId, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-4 title"> Ver Informações</h3>
          <button className="bg-transparent border-0 fs-5 mb-0 d-flex align-item-center " onClick={goBack}>
            <BiArrowBack className="fs-5" /> Voltar
          </button>
        </div>
        <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3 ">
          <div className="d-flex align-item-center gap-3 ">
            <h5 className="mb-0">Nome:</h5>
            <p className="mb-0">{enqName}</p>
          </div>
          <div className="d-flex align-item-center gap-3 ">
            <h5 className="mb-0">Telefone:</h5>
            <p className="mb-0">{enqMobile}</p>
          </div>
          <div className="d-flex align-item-center gap-3 ">
            <h5 className="mb-0">Email:</h5>
            <p className="mb-0">{enqEmail}</p>
          </div>
          <div className="d-flex align-item-center gap-3 ">
            <h5 className="mb-0">Comentario:</h5>
            <p className="mb-0">{enqComment}</p>
          </div>
          <div className="d-flex align-item-center gap-3 ">
            <h5 className="mb-0">Status:</h5>
            <p className="mb-0">{enqStatus}</p>
          </div>
          <div className="d-flex align-item-center gap-3 ">
            <h5 className="mb-0">Nome:</h5>
            <div>
              <select
                name=""
                defaultValue={enqStatus ? enqStatus : "Enviado"}
                id=""
                className="form-control form-select"
              >
                <option value="default" selected>
                  Selecionar Status
                </option>
                <option value="Enviado">Enviado</option>
                <option value="Contatado">Contatado</option>
                <option value="Em Processo" selected>
                  Em Processo
                </option>
                <option value="Resolvido" selected>
                  Resolvido
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEnq;
