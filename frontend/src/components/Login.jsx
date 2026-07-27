import { useState } from 'react';
import axios from '../services/axiosConfig';

export default function Login({ onLoginExitoso }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const respuesta = await axios.post('/api/auth/login', { email, password });

      
      localStorage.setItem('token', respuesta.data.token);

      
      onLoginExitoso(respuesta.data.user);
    } catch (err) {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <form className="auth-form" onSubmit={manejarLogin}>
      <h2>Iniciar sesión</h2>

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

      <button type="submit">Ingresar</button>
    </form>
  );
}