import React, { useState, useEffect } from "react";
import RegisterBranches from "../components/Branches/RegisterBranches";
import ListBranches from "../components/Branches/ListBranches";
import ModalBranch from "../components/Branches/ModalBranch";
import { Toaster } from "react-hot-toast";
import useDataBranches from "../components/Branches/hooks/useDataBranches";

const Branches = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  const {
    id, setId,
    name, setName,
    address, setAddress,
    telephone, setTelephone,
    schedule, setSchedule,
    branches,
    loading,
    saveBranch,
    handleEdit,
    deleteBranch,
    resetForm,
  } = useDataBranches();



  useEffect(() => {
    if (editingBranch) {
      setId(editingBranch._id);
      setName(editingBranch.name);
      setAddress(editingBranch.address);
      setTelephone(editingBranch.telephone);
      setSchedule(editingBranch.schedule);
    }
  }, [editingBranch]);

  const handleSubmit = () => {
    if (id) {
      handleEdit();
    } else {
      saveBranch();
    }
    setShowModal(false);
  };

  return (


      <div className="w-full bg-white shadow-md rounded-lg p-6">

        <button
          onClick={() => {
            setEditingBranch(null);
            resetForm();
            setShowModal(true);
          }}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Sucursal
        </button>

        <ListBranches
          deleteBranch={deleteBranch}
          branches={branches}
          loading={loading}
          setEditingBranch={setEditingBranch}
          setShowModal={setShowModal}
        />

        <ModalBranch isOpen={showModal} onClose={() => setShowModal(false)}>
          <RegisterBranches
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            telephone={telephone}
            setTelephone={setTelephone}
            schedule={schedule}
            setSchedule={setSchedule}
            handleSubmit={handleSubmit}
          />
        </ModalBranch>
      
      <Toaster toastOptions={{ duration: 1000 }} />
</div>
  );
};

export default Branches;