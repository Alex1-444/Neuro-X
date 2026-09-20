"use client";

import { useEffect, useState } from "react";

/**
 * Extrae el color dominante (promedio) de una imagen.
 * Devuelve un string rgb() listo para usar en CSS.
 */
export function useDominantColor(imageSrc, fallback = "rgb(30, 30, 30)") {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 20; // reducimos la imagen para que el cálculo sea rápido
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);

        const { data } = ctx.getImageData(0, 0, size, size);

        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        setColor(`rgb(${r}, ${g}, ${b})`);
      } catch (err) {
        // Si la imagen bloquea el canvas por CORS, mantenemos el fallback
        console.warn("No se pudo extraer el color dominante:", err);
        setColor(fallback);
      }
    };

    img.onerror = () => setColor(fallback);
  }, [imageSrc, fallback]);

  return color;
}
