import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Nav from "./components/Nav"
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Employees from './pages/Employees'
import Branches from './pages/Branches'

function App() {


  return (
    <>
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/employees" element={<Employees/>}/>
        <Route path="/branches" element={<Branches/>}/>
      </Routes>
    </Router>


    </>
  )
}

export default App
