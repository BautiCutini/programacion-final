import React from 'react';
import './MainActions.css';

function MainActions({ AgregarCategoria, EditarCategoria, AgregarTransaccion, VerTransacciones, EliminarTransaccion, Veringresos, RegistrarIngreso, VerBalance }) {
  return (
    <section className="main-actions">
      <div className="actions-header">
        <h2>Gestión</h2>
        {VerBalance && (
          <button type="button" className="balance-button" onClick={VerBalance}>
            Ver balance
          </button>
        )}
      </div>
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
        <button type = "button" className= "action-button" onClick={Veringresos}>
          Ver ingresos
        </button>
        <button type="button" className="action-button" onClick={RegistrarIngreso}>
          Registrar ingreso
        </button>
      </div>
    </section>
  );
}

export default MainActions;
