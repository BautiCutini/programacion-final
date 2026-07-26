import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainActions from './components/MainActions';
import Footer from './components/Footer';
import TransaccionesPage from './components/TransaccionesPage';
import CategoriasPage from './components/CategoriasPage';
import Login from './components/Login';
import Registro from './components/Registro';

function App() {
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [modoTransaccion, setModoTransaccion] = useState('listar');
  const [modoCategoria, setModoCategoria] = useState('listar');
  const [statusMessage, setStatusMessage] = useState('Selecciona una acción para comenzar.');

  
  const [usuario, setUsuario] = useState(null);
  
  const [vistaAuth, setVistaAuth] = useState(null);

  const abrirTransacciones = (modo, mensaje) => {
    setSeccionActiva('transacciones');
    setModoTransaccion(modo);
    setStatusMessage(mensaje);
  };

  const handleVerBalance = () => {
    abrirTransacciones('balance', 'Mostrando balance...');
  };

  
  const handleAuthExitoso = (userData) => {
    setUsuario(userData);
    setVistaAuth(null); 
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setSeccionActiva(null);
  };

  return (
    <div className="App">
      <NavBar
        usuario={usuario}
        onAbrirLogin={() => setVistaAuth('login')}
        onAbrirRegistro={() => setVistaAuth('registro')}
        onLogout={handleLogout}
      />
      <main className="App-main">
        <section className="hero-section">
          <h1>¡Bienvenido a tu controlador de gastos personal!</h1>
          <p>Aca vas a manejar tu dinero de una forma mas segura, precisa y controlada.</p>
        </section>

        {/* si eligio login o registro, mostrar ese formulario */}
        {vistaAuth === 'login' && <Login onLoginExitoso={handleAuthExitoso} />}
        {vistaAuth === 'registro' && <Registro onRegistroExitoso={handleAuthExitoso} />}

        {/*lLa app solo se usa si hay usuario logueado */}
        {usuario && (
          <>
            <MainActions
              VerBalance={handleVerBalance}
              AgregarTransaccion={() => abrirTransacciones('crear', 'Completa el formulario para registrar una transaccion.')}
              VerTransacciones={() => abrirTransacciones('listar', 'Mostrando el historial de transacciones.')}
              EliminarTransaccion={() => abrirTransacciones('eliminar', 'Elige una transaccion del historial para eliminarla.')}
            />

            <section className="status-panel">
              <h2>Estado</h2>
              <p>{statusMessage}</p>
            </section>

            {seccionActiva === 'transacciones' && (
              <TransaccionesPage modo={modoTransaccion} usuario={usuario} />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
