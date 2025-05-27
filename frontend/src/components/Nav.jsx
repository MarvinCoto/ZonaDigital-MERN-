import React from "react";
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a to="/" className="text-lg font-bold">Dashboard</a>
                <ul className="flex space-x-4">
                    <li>
                        <NavLink to="/products" className="hover:text-gray-200">
                            Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/employees" className="hover:text-gray-200">
                            Empleados
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/branches" className="hover:text-gray-200">
                            Sucursales
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;