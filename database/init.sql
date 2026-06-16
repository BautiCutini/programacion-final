-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- TABLA: users

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  nombre        VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password      VARCHAR(255)  NOT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- TABLA: categorias
-- Cada usuario puede tener sus propias categorías.
-- tipo: 'ingreso' o 'gasto'

CREATE TABLE IF NOT EXISTS categorias (
  id            SERIAL PRIMARY KEY,
  nombre        VARCHAR(100)  NOT NULL,
  tipo          VARCHAR(10)   NOT NULL CHECK (tipo IN ('ingreso', 'gasto')),
  user_id       INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at    TIMESTAMP     NOT NULL DEFAULT NOW()
);


-- TABLA: transacciones
-- Tabla principal de la app.
-- tipo: 'ingreso' o 'gasto'

CREATE TABLE IF NOT EXISTS transacciones (
  id            SERIAL PRIMARY KEY,
  monto         NUMERIC(12, 2) NOT NULL CHECK (monto > 0),
  descripcion   VARCHAR(255),
  tipo          VARCHAR(10)    NOT NULL CHECK (tipo IN ('ingreso', 'gasto')),
  fecha         DATE           NOT NULL DEFAULT CURRENT_DATE,
  user_id       INTEGER        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  categoria_id  INTEGER        REFERENCES categorias(id) ON DELETE SET NULL,
  created_at    TIMESTAMP      NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMP      NOT NULL DEFAULT NOW()
);

-- IDICES
CREATE INDEX IF NOT EXISTS idx_transacciones_user_id    ON transacciones(user_id);
CREATE INDEX IF NOT EXISTS idx_transacciones_fecha      ON transacciones(fecha);
CREATE INDEX IF NOT EXISTS idx_transacciones_tipo       ON transacciones(tipo);
CREATE INDEX IF NOT EXISTS idx_transacciones_categoria  ON transacciones(categoria_id);
CREATE INDEX IF NOT EXISTS idx_categorias_user_id       ON categorias(user_id);