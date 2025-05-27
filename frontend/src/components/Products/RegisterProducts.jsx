import React from "react";
import Button from "../Button";

const RegisterProducts = ({
  name, setName,
  description, setDescription,
  price, setPrice,
  stock, setStock,
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
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />


      <Button text={"Guardar"}label="Guardar" type="submit" colorClass="primary" />
    </form>
  );
};

export default RegisterProducts;