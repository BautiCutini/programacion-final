import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainActions from './components/MainActions';
import Footer from './components/Footer';

function App() {
  const [statusMessage, setStatusMessage] = useState('Selecciona una acción para comenzar.');

  const handleVerBalance = () => {
    setStatusMessage('Mostrando balance...');
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
        />

        <section className="status-panel">
          <h2>Estado</h2>
          <p>{statusMessage}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;