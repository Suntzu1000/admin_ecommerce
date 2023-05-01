import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-4" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 ">
        <h3 className="text-center">Esqueceu Senha</h3>
        <p className="text-center">
          Por favor! Digite sua nova Senha!
        </p>
        <form action="">
          <CustomInput type="password" label="Nova Senha" id="password" />
          <CustomInput
            type="password"
            label="Confirmar Senha"
            id="confpassword"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 "
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Redefinir Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;