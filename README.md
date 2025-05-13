# 🏓 Tienda E-Commerce de Pádel



## 📋 Descripción General

Esta es una plataforma moderna de comercio electrónico especializada en equipamiento y accesorios de pádel. Construida con React y Vite, la aplicación ofrece una experiencia de compra fluida con características como filtrado de productos, gestión del carrito y proceso de pago.

## ✨ Características

- 🎯 **Catálogo de Productos**: Navega por una amplia selección de palas y accesorios de pádel
- 🔍 **Filtrado Avanzado**: Filtra productos por marca, precio y otros atributos
- 🛒 **Carrito de Compras**: Añade, elimina y modifica artículos en tu carrito
- 💳 **Proceso de Pago**: Flujo de pago simple y seguro
- 💾 **Almacenamiento Local**: Los datos del carrito persisten entre sesiones
- 📱 **Diseño Responsive**: Optimizado para todos los tamaños de dispositivos
- 🔄 **Animaciones Fluidas**: Experiencia de usuario mejorada con transiciones atractivas

## 🧰 Tecnologías

- **Frontend**: 
  - React 18
  - React Router 7
  - Tailwind CSS
  - Material Tailwind
  - HeroIcons
  - AOS (Animate On Scroll)
  
- **Herramientas de Desarrollo**: 
  - Vite
  - ESLint
  
- **Gestión de Estado**:
  - React Context API

## 🚀 Comenzando

### Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm (v9 o superior)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/e-commerce-padel.git
   cd e-commerce-padel
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador y navega a:
   ```
   http://localhost:5173
   ```

## 📂 Estructura del Proyecto

```
src/
├── assets/           # Imágenes y recursos estáticos
├── components/       # Componentes UI reutilizables
├── contexts/         # React Context para gestión de estado
├── data/             # Archivos JSON de datos
├── hooks/            # Hooks personalizados de React
├── pages/            # Páginas de la aplicación
├── utils/            # Funciones de utilidad
├── App.jsx           # Componente principal de la aplicación
└── main.jsx          # Punto de entrada
```

## 📱 Páginas

- **Inicio**: Página de inicio con productos destacados
- **Listado de Productos**: Páginas para navegar por palas y accesorios de pádel
- **Detalle de Producto**: Vista detallada de productos individuales
- **Carrito**: Gestión del carrito de compras
- **Pago**: Proceso de finalización del pedido
- **Sobre Nosotros**: Información sobre la tienda
- **Políticas**: Políticas y términos de la tienda

## 🔄 Gestión de Estado

La aplicación utiliza React Context API para la gestión del estado, principalmente para la funcionalidad del carrito:

- **CartContext**: Gestiona los artículos del carrito, el total y proporciona métodos para añadir/eliminar productos

## 🎨 Estilos

El proyecto utiliza Tailwind CSS para el estilizado, con componentes adicionales de Material Tailwind. Las animaciones personalizadas se implementan usando tanto transiciones CSS como la librería AOS.

## 📦 Despliegue

Para construir para producción:

```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist`, listos para ser desplegados en cualquier servicio de alojamiento estático.

## 🛠️ Mejoras Futuras

- Autenticación de usuarios y gestión de cuentas
- Funcionalidad de lista de deseos
- Reseñas y valoraciones de productos
- Integración con pasarelas de pago
- Panel de administración para gestión de productos


## 👨‍💻 Autor

Creado por Blayneraptor

---

⭐ Si encuentras útil este proyecto, por favor considera darle una estrella en GitHub!