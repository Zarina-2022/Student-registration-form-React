import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddStudent from "./pages/AddStudent";
import Home from "./pages/Home";
import EditStudent from "./pages/EditStudent";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/add-student"} element={<AddStudent />} />
        <Route path={"/edit-student/:studentId"} element={<EditStudent />}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/*
  Rout'un icinde parametre (id) eklemek icin /(slash)'ten sonra bir degisken tanimlayacagiz.
  Bunun icin /'ten sonra once :'a koyuyoruz , boylece react-router-dom bir degiskenin yazilacagini anliyor.
  Burdaki :(cift nokta) aslinda var degiskeniyle ayni (var studentId, :studentId)
  Ve bu parametreyi okumak icin edit-student sayfasinda {useParams} react-router-dom'dan import etmeliyiz
  <Route path={"/edit-student/:studentId"} element={<EditStudent />}/>

 */