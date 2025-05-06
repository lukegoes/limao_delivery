import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Carrinho from "./pages/Carrinho/Carrinho";
import ColocarPedido from "./pages/ColocarPedido/ColocarPedido";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pedido" element={<ColocarPedido />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
