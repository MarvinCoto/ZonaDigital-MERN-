import React from "react";

const Nav = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a href="/" className="text-lg font-bold">Dashboard</a>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/products" className="hover:text-gray-200">
                            Productos
                        </a>
                    </li>
                    <li>
                        <a href="/employees" className="hover:text-gray-200">
                            Empleados
                        </a>
                    </li>
                    <li>
                        <a href="/branches" className="hover:text-gray-200">
                            Sucursales
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;