import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Controlador de Gastos Personal. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#privacy">Privacidad</a>
          <a href="#terms">Términos</a>
          <a href="#contact">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
