// src/reducers/itemsReducer.js

export const estadoInicial = {
  lista: [],
  filtroCategoria: "todas",
  filtroEstado: "todos",
  busqueda: "",
};

export function itemsReducer(state, action) {
  switch (action.type) {

    case "HIDRATAR":
      return { ...state, lista: action.payload };

    case "AGREGAR":
      return { ...state, lista: [...state.lista, action.payload] };

    case "ELIMINAR":
      return {
        ...state,
        lista: state.lista.filter((s) => s.id !== action.payload),
      };

    case "CAMBIAR_ESTADO":
      return {
        ...state,
        lista: state.lista.map((s) =>
          s.id === action.payload.id
            ? { ...s, estado: action.payload.estado }
            : s
        ),
      };

    case "FILTRAR":
      return {
        ...state,
        [action.payload.campo]: action.payload.valor,
      };

    case "LIMPIAR_FILTROS":
      return {
        ...state,
        filtroCategoria: "todas",
        filtroEstado: "todos",
        busqueda: "",
      };

    case "REGISTRAR_ACTIVIDAD":
      return {
        ...state,
        lista: state.lista.map((s) =>
          s.id === action.payload.id
            ? {
                ...s,
                fechaActividad: action.payload.fecha,
                atributos: { ...s.atributos, ...action.payload.atributos },
              }
            : s
        ),
      };

    default:
      return state;
  }
}