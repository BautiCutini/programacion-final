import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainActions from './components/MainActions';
import Footer from './components/Footer';
import TransaccionesPage from './components/TransaccionesPage';

function App() {
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [modoTransaccion, setModoTransaccion] = useState('listar');

  const abrirTransacciones = (modo, mensaje) => {
    setSeccionActiva('transacciones');
    setModoTransaccion(modo);
    setStatusMessage(mensaje);
  };

  const [statusMessage, setStatusMessage] = useState('Selecciona una acción para comenzar.');

  const handleVerBalance = () => {
    abrirTransacciones('balance', 'Mostrando balance...');
    // Aquí iría la lógica para obtener y mostrar el balance
  };

  return (
    <div className="App">
      <NavBar />
      <main className="App-main">
        <section className="hero-section">
          <h1>¡Bienvenido a tu controlador de gastos personal!</h1>
          <p>Aca vas a manejar tu dinero de una forma mas segura, precisa y controlada.</p>
        </section>

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
        {/* Mostrar la página de transacciones */}
        {seccionActiva === 'transacciones' && (
          <TransaccionesPage modo={modoTransaccion} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App; 
