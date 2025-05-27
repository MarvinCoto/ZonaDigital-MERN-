import React from "react";
import CardBranch from "./CardBranch"

const ListBranches = ({
  deleteBranch,
  updateBranches,
  loading,
  branches,
  setEditingBranch,
  setShowModal
}) => {
  return (
    <>
    <div className="w-full h-[72vh] overflow-y-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-4">Listado de sucursales</h1>

      {loading && <div className="text-center text-gray-500">Cargando...</div>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {branches?.map((branch) => (
          <CardBranch
            key={branch._id}
            branch={branch}
            deleteBranch={deleteBranch}
            setEditingBranch={setEditingBranch}
            setShowModal={setShowModal}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default ListBranches;