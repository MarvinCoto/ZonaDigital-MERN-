import React, { useState, useEffect } from "react";
import RegisterProducts from "../components/Products/RegisterProducts";
import ListProducts from "../components/Products/ListProducts";
import ModalProduct from "../components/Products/ModalProduct";
import { Toaster } from "react-hot-toast";
import useDataProducts from "../components/Products/hooks/useDataProducts";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    id, setId,
    name, setName,
    description, setDescription,
    price, setPrice,
    stock, setStock,
    products,
    loading,
    saveProduct,
    handleEdit,
    deleteProduct,
    resetForm,
  } = useDataProducts();



  useEffect(() => {
    if (editingProduct) {
      setId(editingProduct._id);
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
    }
  }, [editingProduct]);

  const handleSubmit = () => {
    if (id) {
      handleEdit();
    } else {
      saveProduct();
    }
    setShowModal(false);
  };

  return (


      <div className="w-full bg-white shadow-md rounded-lg p-6">

        <button
          onClick={() => {
            setEditingProduct(null);
            resetForm();
            setShowModal(true);
          }}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Producto
        </button>

        <ListProducts
          deleteProduct={deleteProduct}
          products={products}
          loading={loading}
          setEditingProduct={setEditingProduct}
          setShowModal={setShowModal}
        />

        <ModalProduct isOpen={showModal} onClose={() => setShowModal(false)}>
          <RegisterProducts
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            stock={stock}
            setStock={setStock}
            handleSubmit={handleSubmit}
          />
        </ModalProduct>
      
      <Toaster toastOptions={{ duration: 1000 }} />
</div>
  );
};

export default Products;