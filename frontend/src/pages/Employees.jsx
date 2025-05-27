import React, { useState, useEffect } from "react";
import RegisterEmployees from "../components/Employees/RegisterEmployees";
import ListEmployees from "../components/Employees/ListEmployees";
import ModalEmployee from "../components/Employees/ModalEmployee";
import { Toaster } from "react-hot-toast";
import useDataEmployees from "../components/Employees/hooks/useDataEmployees"

const Employees = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const {
    id, setId,
    name, setName,
    lastname, setLastName,
    birthday, setBirthday,
    email, setEmail,
    address, setAddress,
    hireDate, setHireDate,
    password, setPassword,
    telephone, setTelephone,
    dui, setDui,
    isssNumber, setIsssNumber,
    employees,
    loading,
    saveEmployee,
    handleEdit,
    deleteEmployee,
    resetForm,
  } = useDataEmployees();



  useEffect(() => {
    if (editingEmployee) {
      setId(editingEmployee._id);
      setName(editingEmployee.name);
      setLastName(editingEmployee.lastname);
      setBirthday(editingEmployee.birthday);
      setEmail(editingEmployee.email);
      setAddress(editingEmployee.address);
      setHireDate(editingEmployee.hireDate);
      setPassword(editingEmployee.password);
      setTelephone(editingEmployee.telephone);
      setDui(editingEmployee.dui);
      setIsssNumber(editingEmployee.isssNumber);
    }
  }, [editingEmployee]);

  const handleSubmit = () => {
    if (id) {
      handleEdit();
    } else {
      saveEmployee();
    }
    setShowModal(false);
  };

  return (


      <div className="w-full bg-white shadow-md rounded-lg p-6">

        <button
          onClick={() => {
            setEditingEmployee(null);
            resetForm();
            setShowModal(true);
          }}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Empleado
        </button>

        <ListEmployees
          deleteEmployee={deleteEmployee}
          employees={employees}
          loading={loading}
          setEditingEmployee={setEditingEmployee}
          setShowModal={setShowModal}
        />

        <ModalEmployee isOpen={showModal} onClose={() => setShowModal(false)}>
          <RegisterEmployees
            name={name}
            setName={setName}
            lastname={lastname}
            setLastName={setLastName}
            birthday={birthday}
            setBirthday={setBirthday}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            hireDate={hireDate}
            setHireDate={setHireDate}
            password={password}
            setPassword={setPassword}
            telephone={telephone}
            setTelephone={setTelephone}
            dui={dui}
            setDui={setDui}
            isssNumber={isssNumber}
            setIsssNumber={setIsssNumber}
            handleSubmit={handleSubmit}
          />
        </ModalEmployee>
      
      <Toaster toastOptions={{ duration: 1000 }} />
</div>
  );
};

export default Employees;