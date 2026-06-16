# Trabajo final - Control de Gastos Personales 💰

Aplicación web full-stack (por ahora solo backend) para registrar y gestionar gastos e ingresos personales. Permite categorizar transacciones, consultar el balance actual, ver el historial y filtrar por fecha o categoría.

Desarrollado como trabajo final de la materia Programación III — UTN.

---

## Integrantes

- Bautista Cutini
- Lautaro Capdeville
- Francesco DiCarli
- Santino Crivera
- Bautista Bartolini

---

## Documentacion Endpoints de la API

Base URL: `http://localhost:3001/api`

---

### Categorías

#### GET /categorias
Lista todas las categorías registradas.

#### POST /categorias
Crea una nueva categoría.

#### PUT /categorias/:id
Edita una categoría existente.

#### DELETE /categorias/:id
Elimina una categoría por su id.

---

### Transacciones

#### GET /transacciones
Lista todas las transacciones.

#### POST /transacciones
Crea una nueva transacción.

#### PUT /transacciones/:id
Actualiza una transacción existente.

#### DELETE /transacciones/:id
Elimina una transacción por su id.

#### GET /transacciones/balance
Devuelve el balance actual (ingresos, gastos y diferencia).

#### GET /transacciones/filtro
Filtra transacciones por fecha o categoría.






