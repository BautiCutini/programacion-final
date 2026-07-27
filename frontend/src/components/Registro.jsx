import { useState } from 'react';
import axios from '../services/axiosConfig';

export default function Registro({ onRegistroExitoso }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const respuesta = await axios.post('/api/auth/register', { nombre, email, password });

      
      localStorage.setItem('token', respuesta.data.token);

      
      onRegistroExitoso(respuesta.data.user);
    } catch (err) {
      setError('No se pudo registrar. El email puede estar en uso.');
    }
  };

  return (
    <form className="auth-form" onSubmit={manejarRegistro}>
      <h2>Registrarse</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="auth-error">{error}</p>}

      <button type="submit">Crear cuenta</button>
    </form>
  );
}