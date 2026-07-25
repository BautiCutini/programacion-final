import React from 'react';
import './MainActions.css';

function MainActions({ AgregarCategoria, EditarCategoria, AgregarTransaccion, VerTransacciones, EliminarTransaccion }) {
  return (
    <section className="main-actions">
      <h2>Gestión</h2>
      <div className="buttons-grid">
        <button type="button" className="action-button" onClick={AgregarCategoria}>
          Agregar categoría
        </button>
        <button type="button" className="action-button" onClick={EditarCategoria}>
          Editar categoría
        </button>
        <button type="button" className="action-button" onClick={AgregarTransaccion}>
          Agregar transacción
        </button>
        <button type="button" className="action-button" onClick={VerTransacciones}>
          Ver transacciones
        </button>
        <button type="button" className="action-button" onClick={EliminarTransaccion}>
          Eliminar transacción
        </button>
      </div>
    </section>
  );
}

export default MainActions;
