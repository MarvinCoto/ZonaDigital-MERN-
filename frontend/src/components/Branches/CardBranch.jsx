import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const CardBranch = ({ branch, deleteBranch, setEditingBranch, setShowModal }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "¿Eliminar sucursal?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBranch(branch._id);
        Swal.fire("Eliminada", "La sucursal ha sido eliminada.", "success");
      }
    });
  };

  return (
    <div className="relative border p-4 rounded shadow w-64 bg-white">
      {/* Botones arriba a la derecha */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={() => {
            setEditingBranch(branch);
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

      <h2 className="font-bold mt-6 text-lg">{branch.name}</h2>

<p>
  <span className="font-bold text-slate-600">Dirección:</span>{" "}
  <span className="text-gray-800">{branch.address}</span>
</p>
<p>
  <span className="font-bold text-slate-600">Telefono:</span>{" "}
  <span className="text-gray-800">{branch.telephone}</span>
</p>
<p>
  <span className="font-bold text-slate-600">Horario:</span>{" "}
  <span className="text-gray-800">{branch.schedule}</span>
</p>
    </div>
  );
};

export default CardBranch;