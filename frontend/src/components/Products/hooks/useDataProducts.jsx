import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useDataProducts = () => {
  const [id, setId] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL fija directamente en el código
  const API = "http://localhost:4000/api/products";

  const fetchProducts = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveProduct = async () => {
    const newProduct = {
      name: nameProduct,
      description: descriptionProduct,
      price,
      stock,
    };

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error();
      toast.success("Producto registrado");
      fetchProducts();
      resetForm();
    } catch {
      toast.error("Error al registrar el producto");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      toast.success("Producto eliminado");
      fetchProducts();
    } catch {
      toast.error("Error al eliminar producto");
    }
  };

  const handleEdit = async () => {
    const editProduct = {
      name: nameProduct,
      description: descriptionProduct,
      price,
      stock,
    };

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      });
      if (!response.ok) throw new Error();
      toast.success("Producto actualizado");
      fetchProducts();
      resetForm();
    } catch {
      toast.error("Error al actualizar producto");
    }
  };

  const resetForm = () => {
    setId("");
    setNameProduct("");
    setDescriptionProduct("");
    setPrice("");
    setStock("");
  };

  return {
    id,
    setId,
    name: nameProduct,
    setName: setNameProduct,
    description: descriptionProduct,
    setDescription: setDescriptionProduct,
    price,
    setPrice,
    stock,
    setStock,
    products,
    loading,
    saveProduct,
    handleEdit,
    deleteProduct,
    resetForm,
  };
};

export default useDataProducts;