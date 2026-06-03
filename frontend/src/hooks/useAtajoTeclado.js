// src/hooks/useAtajoTeclado.js
import { useEffect } from "react";

function useAtajoTeclado(atajo, callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      const teclas = atajo.toLowerCase().split("+");
      const ctrl = teclas.includes("ctrl") ? e.ctrlKey || e.metaKey : true;
      const shift = teclas.includes("shift") ? e.shiftKey : true;
      const tecla = teclas[teclas.length - 1];

      const enInput =
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA";

      if (ctrl && shift && e.key.toLowerCase() === tecla && !enInput) {
        e.preventDefault();
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // cleanup
  }, [atajo, callback]);
}

export default useAtajoTeclado;