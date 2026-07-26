import React from 'react';
import './NavBar.css';

function NavBar({ usuario, onAbrirLogin, onAbrirRegistro, onLogout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-menu navbar-right">
        {usuario ? (
          // Si hay usuario logueado: mostrar su nombre y botón de salir
          <>
            <li className="navbar-item">Hola, {usuario.nombre}</li>
            <li className="navbar-item">
              <button onClick={onLogout}>Cerrar sesión</button>
            </li>
          </>
        ) : (
          // Si no hay usuario: mostrar registrarse e iniciar sesión
          <>
            <li className="navbar-item">
              <button onClick={onAbrirRegistro}>Registrarse</button>
            </li>
            <li className="navbar-item">
              <button onClick={onAbrirLogin}>Iniciar sesión</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
