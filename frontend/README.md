# Mi Colección Personal — Bitácora de Entrenamiento

App full-stack para registrar y gestionar sesiones de entrenamiento físico personal.

## Stack Tecnológico
- **Frontend:** React 19 + Vite, useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, React.memo
- **Backend:** Node.js + Express + SQLite (better-sqlite3)
- **Gráficas:** Recharts
- **Persistencia:** LocalStorage (modo local) o API REST (modo API)

## Estructura del Proyecto
mi-coleccion-personal/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── FormularioItem.jsx
│       │   ├── ListaItems.jsx
│       │   ├── ItemCard.jsx
│       │   └── Dashboard.jsx
│       ├── context/
│       │   ├── StorageContext.jsx
│       │   ├── ThemeContext.jsx
│       │   └── UserContext.jsx
│       ├── reducers/
│       │   └── itemsReducer.js
│       ├── utils/
│       │   ├── storage.js
│       │   └── categorias.js
│       └── App.jsx
├── backend/
│   └── src/
│       ├── routes/items.js
│       ├── db/database.js
│       └── index.js
├── .gitignore
└── README.md

## Modelo de Datos — Sesión de Entrenamiento

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador único |
| nombre | string | Nombre de la sesión |
| categoriaId | string | fuerza, cardio, hiit, flexibilidad, descanso |
| estado | string | pendiente, completado, cancelado |
| puntuacion | number | 1-10 |
| fechaRegistro | string ISO | Fecha de creación |
| fechaActividad | string ISO | Fecha de la sesión |
| notas | string | Observaciones |
| atributos | JSON | { duracion, series } |
| activo | boolean | Si está activo |

## Categorías

| ID | Nombre | Color |
|---|---|---|
| fuerza | Fuerza | #e74c3c |
| cardio | Cardio | #3498db |
| hiit | HIIT | #f39c12 |
| flexibilidad | Flexibilidad | #2ecc71 |
| descanso | Descanso | #9b59b6 |

## Acciones del Reducer

| Acción | Descripción |
|---|---|
| HIDRATAR | Carga la lista completa desde la fuente de datos |
| AGREGAR | Agrega una nueva sesión a la lista |
| ELIMINAR | Elimina una sesión por id |
| CAMBIAR_ESTADO | Cambia el estado de una sesión |
| FILTRAR | Aplica filtro por categoria, estado o búsqueda |
| LIMPIAR_FILTROS | Resetea todos los filtros |
| REGISTRAR_ACTIVIDAD | Actualiza fecha y atributos de una sesión |

## Optimización

| Técnica | Uso |
|---|---|
| useMemo | Lista filtrada y estadísticas |
| useCallback | Handlers: agregar, editar, eliminar, cambiarEstado |
| React.memo | ItemCard — evita re-renders innecesarios |

## Cómo Correr el Proyecto

### Frontend
```bash
cd frontend
npm install
npm run dev
# Abre http://localhost:5173
```

### Backend
```bash
cd backend
npm install
node src/index.js
# Corre en http://localhost:3000
```

## Endpoints API

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/items | Lista todas las sesiones |
| GET | /api/items/:id | Obtiene una sesión |
| POST | /api/items | Crea una sesión |
| PUT | /api/items/:id | Actualiza una sesión |
| DELETE | /api/items/:id | Elimina una sesión |
| POST | /api/items/:id/registro | Agrega un registro |

## Capturas

### Dashboard con Gráficas
![Dashboard](Fase3.png)

## Fases Completadas

### Fase 1 
- useState con lazy initializer
- useEffect para sincronizar con LocalStorage
- CRUD completo en frontend
- API REST con Express + SQLite
- CORS configurado

### Fase 2 
- StorageContext — abstrae API vs LocalStorage
- ThemeContext — claro/oscuro con variables CSS y atajo T
- UserContext — nombre y preferencias persistidas
- useRef 1 — focus en input tras agregar sesión
- useRef 2 — setInterval para auto-refresh en modo API
- 5 categorías con color hex en utils/categorias.js

### Fase 3 
- useReducer con 7 acciones puras
- Dashboard con 3 gráficas Recharts
- useMemo para lista filtrada y estadísticas
- useCallback en todos los handlers
- React.memo en ItemCard