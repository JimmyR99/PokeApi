import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import FavoritePage from "./pages/FavoritePage";
function App() {
  
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/favoritos" element={<FavoritePage/>}></Route>
        <Route path="/pokemon/:id" element={<PokemonPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
