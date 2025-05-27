import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const CardProduct = ({ product, deleteProduct, setEditingProduct, setShowModal }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id);
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
      }
    });
  };

  return (
    <div className="relative border p-4 rounded shadow w-64 bg-white">
      {/* Botones arriba a la derecha */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={() => {
            setEditingProduct(product);
            setShowModal(true);
          }}
          className="text-yellow-500 hover:text-yellow-600"
          title="Editar"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
          title="Eliminar"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h2 className="font-bold mt-6 text-lg">{product.name}</h2>

<p>
  <span className="font-bold text-slate-600">Descripción:</span>{" "}
  <span className="text-gray-800">{product.description}</span>
</p>
<p>
  <span className="font-bold text-slate-600">Precio:</span>{" "}
  <span className="text-gray-800">{product.price}</span>
</p>
<p>
  <span className="font-bold text-slate-600">Stock:</span>{" "}
  <span className="text-gray-800">{product.stock}</span>
</p>
    </div>
  );
};

export default CardProduct;