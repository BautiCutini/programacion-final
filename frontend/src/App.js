import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainActions from './components/MainActions';

function App() {
  const [statusMessage, setStatusMessage] = useState('Selecciona una acción para comenzar.');

  
  

  return (
    <div className="App">
      <NavBar />
      <main className="App-main">
        <section className="hero-section">
          <h1>¡Bienvenido a tu controlador de gastos personal!</h1>
          <p>Aca vas a manejar tu dinero de una forma mas segura y precisa.</p>
        </section>

        <MainActions
          
          
        />

        <section className="status-panel">
          <h2>Estado</h2>
          <p>{statusMessage}</p>
        </section>
      </main>
    </div>
  );
}

export default App;