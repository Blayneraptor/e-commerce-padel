import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./index.css";
import ProductPage from "./components/ProductPage";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (fadeOut) {
      setShowSplash(false);
    }
  };

  return (
    <div>
      <Header />
      <ProductPage />
      {showSplash && (
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
    </div>
  );
}

export default App;