import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useDataBranches = () => {
  const [id, setId] = useState("");
  const [nameBranch, setNameBranch] = useState("");
  const [addressBranch, setAddressBranch] = useState("");
  const [telephone, setTelephone] = useState("");
  const [schedule, setSchedule] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL fija directamente en el código
  const API = "https://zonadigital-mern.onrender.com/api/branches";

  const fetchBranches = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setBranches(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener sucursales", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const saveBranch = async () => {
    const newBranch = {
      name: nameBranch,
      address: addressBranch,
      telephone,
      schedule,
    };

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBranch),
      });
      if (!response.ok) throw new Error();
      toast.success("Sucursal registrada");
      fetchBranches();
      resetForm();
    } catch {
      toast.error("Error al registrar la sucursal");
    }
  };

  const deleteBranch = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      toast.success("Sucursal eliminada");
      fetchBranches();
    } catch {
      toast.error("Error al eliminar sucursal");
    }
  };

  const handleEdit = async () => {
    const editBranch = {
      name: nameBranch,
      address: addressBranch,
      telephone,
      schedule,
    };

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editBranch),
      });
      if (!response.ok) throw new Error();
      toast.success("Sucursal actualizada");
      fetchBranches();
      resetForm();
    } catch {
      toast.error("Error al actualizar sucursal");
    }
  };

  const resetForm = () => {
    setId("");
    setNameBranch("");
    setAddressBranch("");
    setTelephone("");
    setSchedule("");
  };

  return {
    id,
    setId,
    name: nameBranch,
    setName: setNameBranch,
    address: addressBranch,
    setAddress: setAddressBranch,
    telephone,
    setTelephone,
    schedule,
    setSchedule,
    branches,
    loading,
    saveBranch,
    handleEdit,
    deleteBranch,
    resetForm,
  };
};

export default useDataBranches;