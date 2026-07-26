import { useEffect, useState } from 'react';
import axios from 'axios';
import './TransaccionesPage.css';

export default function TransaccionesPage({ modo , usuario }) {
  const [transacciones, setTransacciones] = useState([]);
  const [balance, setBalance] = useState(null);
  const [form, setForm] = useState({
    monto: '',
    tipo: 'gasto',
    descripcion: '',
    fecha: new Date().toISOString().slice(0, 10),
    categoria_id: '',
  });

  const cargarDatos = async () => {
    const [transaccionesRes, balanceRes] = await Promise.all([
      axios.get('/api/transacciones'),
      axios.get('/api/transacciones/balance'),
    ]);

    setTransacciones(transaccionesRes.data);
    setBalance(balanceRes.data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cambiarCampo = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarTransaccion = async (e) => {
    e.preventDefault();

    await axios.post('/api/transacciones', {
      ...form,
      monto: Number(form.monto),
      categoria_id: Number(form.categoria_id),
      user_id: usuario.id,
    });

    setForm({
      monto: '',
      tipo: 'gasto',
      descripcion: '',
      fecha: new Date().toISOString().slice(0, 10),
      categoria_id: '',
    });

    cargarDatos();
  };

  const eliminarTransaccion = async (id) => {
    await axios.delete(`/api/transacciones/${id}`);
    cargarDatos();
  };

  return (
    <section className="transacciones-page">
      <div className="transacciones-title">
        <h1>Transacciones</h1>
        <p>Administra tus ingresos y gastos personales.</p>
      </div>

      {modo === 'balance' && balance && (
        <div className="balance-cards">
          <article className="balance-card income-card">
            <span>Ingresos</span>
            <strong>${balance.ingresos}</strong>
          </article>
          <article className="balance-card expense-card">
            <span>Gastos</span>
            <strong>${balance.gastos}</strong>
          </article>
          <article className="balance-card total-card">
            <span>Balance total</span>
            <strong>${balance.balance}</strong>
          </article>
        </div>
      )}

      {modo === 'crear' && <form className="transaccion-form" onSubmit={guardarTransaccion}>
        <h2>Nueva transacción</h2>
        <div className="form-grid">
        <input
          name="monto"
          type="number"
          placeholder="Monto"
          value={form.monto}
          onChange={cambiarCampo}
          required
        />

        <select name="tipo" value={form.tipo} onChange={cambiarCampo}>
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>

        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={cambiarCampo}
        />

        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={cambiarCampo}
          required
        />

        <input
          name="categoria_id"
          type="number"
          placeholder="ID de categoría"
          value={form.categoria_id}
          onChange={cambiarCampo}
          required
        />
        </div>

        <button className="save-button" type="submit">Guardar transacción</button>
      </form>}

      {(modo === 'listar' || modo === 'eliminar') && <>
      <div className="historial-header">
        <h2>Historial de transacciones</h2>
        <span>{transacciones.length} registradas</span>
      </div>
      <div className="table-wrapper">
      <table className="transacciones-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Monto</th>
            {modo === 'eliminar' && <th>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {transacciones.map((transaccion) => (
            <tr key={transaccion.id}>
              <td>{transaccion.fecha}</td>
              <td><span className={`tipo-badge ${transaccion.tipo}`}>{transaccion.tipo}</span></td>
              <td>{transaccion.descripcion}</td>
              <td className={`monto ${transaccion.tipo}`}>${transaccion.monto}</td>
              {modo === 'eliminar' && (
                <td>
                  <button className="delete-button" onClick={() => eliminarTransaccion(transaccion.id)}>
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </>}
    </section>
  );
}
