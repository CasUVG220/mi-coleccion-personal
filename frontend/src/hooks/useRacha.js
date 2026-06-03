// src/hooks/useRacha.js
import { useMemo } from "react";

// Hook de dracha
function useRacha(sesiones) {
  const racha = useMemo(() => {
    if (!sesiones || sesiones.length === 0) return 0;

    const fechas = [
      ...new Set(
        sesiones
          .filter((s) => s.estado === "completado")
          .map((s) => s.fechaActividad)
      ),
    ].sort((a, b) => new Date(b) - new Date(a));

    if (fechas.length === 0) return 0;

    let streak = 1;
    for (let i = 0; i < fechas.length - 1; i++) {
      const actual = new Date(fechas[i]);
      const siguiente = new Date(fechas[i + 1]);
      const diff = (actual - siguiente) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [sesiones]);

  return racha;
}

export default useRacha;