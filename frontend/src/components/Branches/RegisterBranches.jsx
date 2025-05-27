import React from "react";
import Button from "../Button";

const RegisterBranches = ({
  name, setName,
  address, setAddress,
  telephone, setTelephone,
  schedule, setSchedule,
  handleSubmit,
}) => {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Horario"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />


      <Button text={"Guardar"}label="Guardar" type="submit" colorClass="primary" />
    </form>
  );
};

export default RegisterBranches;