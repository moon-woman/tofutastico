import React from 'react';
import ReactDOM from 'react-dom/client';
// import * as serviceWorker from './serviceWorker';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Registrarse from './components/registro';
import Login from './components/login';
import Logout from './components/logout';
import Receta from './components/single';
import Busqueda from './components/busqueda';
import Perfil from './components/perfil';
import NuevaReceta from './components/nuevaReceta';
import Editar from './components/editar';
import Eliminar from './components/eliminar';
import PerfilEditar from './components/user/editarusuario';





// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/registro' element={<Registrarse />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/post/:slug' element={<Receta />} />
        <Route path='post/crear' element={<NuevaReceta />} />
        <Route path='/post/editar/:id' element={<Editar />} />
        <Route path='/post/eliminar/:id' element={<Eliminar />} />
        <Route path='/search' element={<Busqueda />} />
        <Route path='/profile/:alias' element={<Perfil />} />
        <Route path='/profile/:alias/editar' element={<PerfilEditar />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);


// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
