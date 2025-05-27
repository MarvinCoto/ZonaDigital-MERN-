import React from "react";
import CardProduct from "../Products/CardProduct";

const ListProducts = ({
  deleteProduct,
  updateEmployees,
  loading,
  products,
  setEditingProduct,
  setShowModal
}) => {
  return (
    <>
    <div className="w-full h-[50vh] overflow-y-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-4">Listado de productos</h1>

      {loading && <div className="text-center text-gray-500">Cargando...</div>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {products?.map((product) => (
          <CardProduct
            key={product._id}
            product={product}
            deleteProduct={deleteProduct}
            setEditingProduct={setEditingProduct}
            setShowModal={setShowModal}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default ListProducts;