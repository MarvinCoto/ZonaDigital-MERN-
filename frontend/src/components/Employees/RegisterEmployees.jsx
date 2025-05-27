import React from "react";
import Button from "../Button";

const RegisterEmployees = ({
  name, setName,
  lastname, setLastName,
  birthday, setBirthday,
  email, setEmail,
  address, setAddress,
  hireDate, setHireDate,
  password, setPassword,
  telephone, setTelephone,
  dui, setDui,
  isssNumber, setIsssNumber,
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
        placeholder="Apellido"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Fecha de cumpleaños"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        placeholder="Contratación"
        value={hireDate}
        onChange={(e) => setHireDate(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
        placeholder="Dui"
        value={dui}
        onChange={(e) => setDui(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Isss"
        value={isssNumber}
        onChange={(e) => setIsssNumber(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />


      <Button text={"Guardar"}label="Guardar" type="submit" colorClass="primary" />
    </form>
  );
};

export default RegisterEmployees;