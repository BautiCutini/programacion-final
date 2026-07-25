import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-menu navbar-right">
        <li className="navbar-item">
          <a href="#register">Registrarse</a>
        </li>
        <li className="navbar-item">
          <a href="#login">Iniciar sesión</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
