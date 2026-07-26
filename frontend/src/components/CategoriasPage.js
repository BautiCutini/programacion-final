import { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoriasPage.css';

export default function CategoriasPage({ modo, usuario }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: '', tipo: 'gasto' });
  const [editandoId, setEditandoId] = useState(null);

  const cargarDatos = async () => {
    const res = await axios.get('/api/categorias');
    setCategorias(res.data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cambiarCampo = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarForm = () => {
    setForm({ nombre: '', tipo: 'gasto' });
    setEditandoId(null);
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (editandoId) {
      // modo editar: actualiza la categoría seleccionada
      await axios.put(`/api/categorias/${editandoId}`, form);
    } else {
      // modo crear: crea una categoría nueva para el usuario logueado
      await axios.post('/api/categorias', { ...form, user_id: usuario.id });
    }

    limpiarForm();
    cargarDatos();
  };

  const iniciarEdicion = (categoria) => {
    setEditandoId(categoria.id);
    setForm({ nombre: categoria.nombre, tipo: categoria.tipo });
  };

  const eliminarCategoria = async (id) => {
    await axios.delete(`/api/categorias/${id}`);
    cargarDatos();
  };

  const mostrarForm = modo === 'crear' || (modo === 'editar' && editandoId);

  return (
    <section className="categorias-page">
      <div className="categorias-title">
        <h1>Categorías</h1>
        <p>Organiza tus ingresos y gastos por categoría.</p>
      </div>

      {mostrarForm && (
        <form className="categoria-form" onSubmit={guardarCategoria}>
          <h2>{editandoId ? 'Editar categoría' : 'Nueva categoría'}</h2>
          <div className="form-grid">
            <input
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={cambiarCampo}
              required
            />

            <select name="tipo" value={form.tipo} onChange={cambiarCampo}>
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>
          </div>

          <div className="form-actions">
            <button className="save-button" type="submit">
              {editandoId ? 'Guardar cambios' : 'Guardar categoría'}
            </button>
            {editandoId && (
              <button className="cancel-button" type="button" onClick={limpiarForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      {(modo === 'listar' || modo === 'editar' || modo === 'eliminar') && (
        <>
          <div className="historial-header">
            <h2>Categorías registradas</h2>
            <span>{categorias.length} categorías</span>
          </div>
          <div className="table-wrapper">
            <table className="categorias-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  {(modo === 'editar' || modo === 'eliminar') && <th>Acciones</th>}
                </tr>
              </thead>

              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.nombre}</td>
                    <td>
                      <span className={`tipo-badge ${categoria.tipo}`}>{categoria.tipo}</span>
                    </td>
                    {modo === 'editar' && (
                      <td>
                        <button className="edit-button" onClick={() => iniciarEdicion(categoria)}>
                          Editar
                        </button>
                      </td>
                    )}
                    {modo === 'eliminar' && (
                      <td>
                        <button className="delete-button" onClick={() => eliminarCategoria(categoria.id)}>
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}