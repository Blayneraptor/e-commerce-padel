import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambié a ReactDOM.createRoot() si usas React 18+
import App from './App'; // Importas el componente App.jsx

// Crear el contenedor en el DOM y renderizar el componente App
const root = ReactDOM.createRoot(document.getElementById('app')); // 'app' es el ID que tienes en tu index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
