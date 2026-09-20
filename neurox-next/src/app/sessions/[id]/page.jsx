// esta codigo solo es para ver los detalles de la pagina sesions (imagen grande, titulo, texto y boton (iniciar sesion))

import { getSessionById } from "@/data/CarouselsData";
import { notFound } from "next/navigation";
import SessionClient from "./SessionClient"; // Importamos el componente cliente

export default async function SessionDetail({ params }) {
  // En Next.js 15+, params es asíncrono
  const { id } = await params;

  // Obtenemos los datos en el servidor
  const session = getSessionById(id);

  if (!session) {
    notFound();
  }

  // Pasamos la sesión al componente cliente que maneja el color y la UI
  return <SessionClient session={session} />;
}
