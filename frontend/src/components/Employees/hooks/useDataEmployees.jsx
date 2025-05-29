import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useDataEmployees = () => {
  const [id, setId] = useState("");
  const [nameEmployee, setNameEmployee] = useState("");
  const [lastNameEmployee, setlastNameEmployee] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dui, setDui] = useState("");
  const [isssNumber, setIsssNumber] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL fija directamente en el código
  const API = "https://zonadigital-mern.onrender.com/api/employees";

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener empleados", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const saveEmployee = async () => {
    const newEmployee = {
      name: nameEmployee,
      lastname: lastNameEmployee,
      birthday,
      email,
      address,
      hireDate,
      password,
      telephone,
      dui,
      isssNumber,
    };

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error();
      toast.success("Empleado registrado");
      fetchEmployees();
      resetForm();
    } catch {
      toast.error("Error al registrar el empleado");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      toast.success("Empleado eliminado");
      fetchEmployees();
    } catch {
      toast.error("Error al eliminar empleado");
    }
  };

  const handleEdit = async () => {
    const editEmployee = {
      name: nameEmployee,
      lastname: lastNameEmployee,
      birthday,
      email,
      address,
      hireDate,
      password,
      telephone,
      dui,
      isssNumber,
    };

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEmployee),
      });
      if (!response.ok) throw new Error();
      toast.success("Empleado actualizado");
      fetchEmployees();
      resetForm();
    } catch {
      toast.error("Error al actualizar empleado");
    }
  };

  const resetForm = () => {
    setId("");
    setNameEmployee("");
    setlastNameEmployee("");
    setBirthday("");
    setEmail("");
    setAddress("");
    setHireDate("");
    setPassword("");
    setTelephone("");
    setDui("");
    setIsssNumber("");
  };

  return {
    id,
    setId,
    name: nameEmployee,
    setName: setNameEmployee,
    lastname: lastNameEmployee,
    setLastName: setlastNameEmployee,
    birthday,
    setBirthday,
    email,
    setEmail,
    address,
    setAddress,
    hireDate,
    setHireDate,
    password,
    setPassword,
    telephone,
    setTelephone,
    dui,
    setDui,
    isssNumber,
    setIsssNumber,
    employees,
    loading,
    saveEmployee,
    handleEdit,
    deleteEmployee,
    resetForm,
  };
};

export default useDataEmployees;