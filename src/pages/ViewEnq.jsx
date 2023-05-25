import React from "react";
import { useLocation } from "react-router-dom";

const ViewEnq = () => {
  const location = useLocation();
  const getEnqId = location.pathname.split("/")[3];

  return (
    <>
      <div>
        <div className="mb-4 title"> Ver Informações</div>
        <div className="mt-5 bg-white p-4 rounded-3 "></div>
      </div>
    </>
  );
};

export default ViewEnq;
