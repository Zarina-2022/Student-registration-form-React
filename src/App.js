import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddStudent from "./pages/AddStudent";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/add-student"} element={<AddStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
