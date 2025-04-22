import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "./components/Header";
import "./index.css";
import ProductPage from "./pages/ProductPage";
import AboutUs from "./pages/AboutUs";
import PadelPage from "./pages/PadelPage";
import Accesorios from "./pages/Accesorios";
import PadelDetail from "./pages/PadelDetail";
import CartPage from "./pages/CartPage";
import Cart from "./components/Cart";
import CartProvider from "./contexts/CartContext";

function Layout() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Detectamos si se ha recargado la página
    const navEntries = performance.getEntriesByType("navigation");
    const wasReload = navEntries.length > 0 && navEntries[0].type === "reload";

    if (isMainPage && (wasReload || !sessionStorage.getItem("splashShown"))) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        sessionStorage.setItem("splashShown", "true");
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [isMainPage]);

  const handleTransitionEnd = () => {
    if (fadeOut) {
      setShowSplash(false);
    }
  };

  return (
    <>
      <Header />
      <Cart />
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={700} classNames="page">
          <div>
            <Routes location={location}>
              <Route path="/" element={<ProductPage />} />
              <Route path="/sobre-nosotros" element={<AboutUs />} />
              <Route path="/palas-de-padel" element={<PadelPage />} />
              <Route path="/palas-de-padel/:id" element={<PadelDetail />} />
              <Route path="/accesorios" element={<Accesorios />} />
              <Route path="/carrito" element={<CartPage />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      {isMainPage && showSplash && (
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <h1 className="text-center text-5xl font-bold tracking-tight text-gray-900 animate-smoothPulse">
            PADEL SHOP EN DESARROLLO
          </h1>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;