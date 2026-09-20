// src/data/CarouselsData.js

// 1. Carrusel de "Continuar viendo" (No se incluye en la búsqueda dinámica)
export const continueWatching = [
  {
    id: 1,
    title: "El hipócampo",
    progress: 65,
    thumbnail: "/images/imagen-hipocampo.webp",
    videoSrc: "/videos/hipocampo-preview.mp4",
    duration: "8 min • 5 min restantes",
  },
  {
    id: 2,
    title: "La neurona",
    progress: 30,
    thumbnail: "/images/imagen-neurona.jpg",
    videoSrc: "/videos/neurona-preview.mp4",
    duration: "12 min • 8 min restantes",
  },
  {
    id: 3,
    title: "El corazón",
    progress: 80,
    thumbnail: "/images/imagen-corazon.webp",
    videoSrc: "/videos/corazon-preview.mp4",
    duration: "12 min • 8 min restantes",
  },
  {
    id: 4,
    title: "El cerebelo",
    progress: 10,
    thumbnail: "/images/imagen-hipocampo.webp",
    videoSrc: "/videos/cerebelo-preview.mp4",
    duration: "12 min • 8 min restantes",
  },
  {
    id: 5,
    title: "Las sinapsis",
    progress: 50,
    thumbnail: "/images/imagen-neurona.jpg",
    videoSrc: "/videos/sinapsis-preview.mp4",
    duration: "12 min • 8 min restantes",
  },
];

// 2. Carruseles Standard (Se incluyen en la búsqueda dinámica)
export const popularCarousel = [
  {
    id: 101,
    title: "El hipócampo",
    summary: "La neurona es uno de los organos mas poderosos del ser humano...",
    fullDescription:
      "El hipocampo es una estructura fundamental del cerebro humano, ubicada en el lóbulo temporal. Juega un papel crucial en la consolidación de la memoria, el aprendizaje y la navegación espacial. En esta sesión exploraremos su anatomía y funciones principales de manera detallada.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "8 min",
    difficulty: "Fácil",
  },
  {
    id: 102,
    title: "La neurona",
    genero: "Neurociencia",
    summary: "La neurona es uno de los organos mas poderosos del ser humano...",
    fullDescription:
      "Las neuronas son las células altamente especializadas del sistema nervioso. Su función principal es recibir, procesar y transmitir información a través de señales eléctricas y químicas en todo el cuerpo.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "12 min",
    difficulty: "Fácil",
  },
  {
    id: 103,
    title: "El corazón",
    summary: "El corazón es el motor principal del sistema circulatorio...",
    fullDescription:
      "Descubre cómo el corazón bombea sangre sin descanso a través de una compleja red de venas y arterias, asegurando que el oxígeno y los nutrientes lleguen a cada célula de nuestro cuerpo.",
    thumbnail: "/imagesWebp/imagen-corazón.webp",
    duration: "8 min",
    difficulty: "Dificil",
  },
  {
    id: 104,
    title: "El cerebelo",
    summary: "Encargado de la coordinación y el equilibrio motriz...",
    fullDescription:
      "El cerebelo procesa información proveniente de otras áreas del cerebro, de la médula espinal y de los receptores sensoriales con el fin de indicar el tiempo exacto para realizar movimientos coordinados y suaves.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "10 min",
    difficulty: "Medio",
  },
  {
    id: 105,
    title: "Las sinapsis",
    summary: "El punto de comunicación entre dos neuronas...",
    fullDescription:
      "Aprende el fascinante proceso de la sinapsis, donde los neurotransmisores viajan a través del espacio sináptico para llevar mensajes críticos que nos permiten pensar, sentir y movernos.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "6 min",
    difficulty: "Fácil",
  },
  {
    id: 106,
    title: "La médula espinal",
    summary: "La autopista principal de información del cuerpo...",
    fullDescription:
      "La médula espinal conecta el cerebro con los nervios de la mayor parte del cuerpo. Esto permite que el cerebro envíe mensajes al resto del cuerpo, siendo vital para el movimiento y la percepción sensorial.",
    thumbnail: "/images/imagen-corazon.webp",
    duration: "12 min",
    difficulty: "Medio",
  },
];

export const neurocienciaCarousel = [
  {
    id: 201,
    title: "sistema nervioso",
    summary:
      "El sistema nervioso es uno de los organos mas poderosos del ser humano...",
    fullDescription:
      "El sistema nervioso es una red compleja de nervios y células que llevan mensajes desde y hacia el cerebro y la médula espinal a diversas partes del cuerpo.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "8 min",
    difficulty: "Fácil",
    stages: [
      {
        title: "Anatomia Interna",
        type: "Exploración 3D",
        description:
          "Desmenuza la neurona. Explora la mitocondria, el aparato de Golgi y el suma desde adentro",
        time: "4 min",
        icon: "🔬",
      },
      {
        title: "La Sinapsis",
        type: "Laboratorio",
        description:
          "Escoge los neurotransmisores correctos, colócalos en los receptores y haz que ocurra la magia.",
        time: "5 min",
        icon: "⚡",
      },
      {
        title: "Redes Neuronales",
        type: "Simulador",
        description:
          "Conecta múltiples neuronas y observa cómo se transmite el pensamiento en tiempo real.",
        time: "3 min",
        icon: "🧠",
      },
    ],
  },
  {
    id: 202,
    title: "La neurona",
    summary: "La neurona es uno de los organos mas poderosos del ser humano...",
    fullDescription:
      "Sumérgete en el fascinante mundo de la célula fundamental del cerebro. En esta sesión desglosaremos la anatomía interna de la neurona y descubriremos cómo sus tres variantes principales —sensoriales, motoras e interneuronas— trabajan en perfecta sincronía para procesar tu realidad. Además, exploraremos el increíble fenómeno de la neuroplasticidad: cómo estas redes neuronales se reconfiguran físicamente cada vez que aprendes algo nuevo, demostrando que tu cerebro está en constante evolución.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "12 min",
    difficulty: "Fácil",
    stages: [
      {
        title: "Anatomia Interna",
        type: "Exploración 3D",
        description:
          "Desmenuza la neurona. Explora la mitocondria, el aparato de Golgi y el suma desde adentro",
        time: "4 min",
        icon: "🔬",
      },
      {
        title: "La Sinapsis",
        type: "Laboratorio",
        description:
          "Escoge los neurotransmisores correctos, colócalos en los receptores y haz que ocurra la magia.",
        time: "5 min",
        icon: "⚡",
      },
      {
        title: "Redes Neuronales",
        type: "Simulador",
        description:
          "Conecta múltiples neuronas y observa cómo se transmite el pensamiento en tiempo real.",
        time: "3 min",
        icon: "🧠",
      },
    ],
  },
  {
    id: 203,
    title: "El corazón",
    summary: "Relevancia del corazón en el sistema autonómico...",
    fullDescription:
      "Aunque es un órgano cardiovascular, exploraremos cómo el sistema nervioso autónomo regula la frecuencia cardíaca y la respuesta de 'lucha o huida'.",
    thumbnail: "/images/imagen-corazon.webp",
    duration: "8 min",
    difficulty: "Fácil",
  },
  {
    id: 204,
    title: "El cerebelo",
    summary: "El centro del control motor...",
    fullDescription:
      "Profundizaremos en cómo el cerebelo almacena la memoria motora, permitiéndonos realizar tareas complejas como andar en bicicleta o tocar un instrumento sin pensar conscientemente en ello.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "10 min",
    difficulty: "Medio",
  },
  {
    id: 205,
    title: "Las sinapsis",
    summary: "Química cerebral en acción...",
    fullDescription:
      "Estudio detallado de los principales neurotransmisores (dopamina, serotonina, glutamato) y cómo su balance afecta nuestra salud mental y comportamiento.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "6 min",
    difficulty: "Fácil",
  },
  {
    id: 206,
    title: "La médula espinal",
    summary: "Reflejos y vías neuronales...",
    fullDescription:
      "Comprende cómo los arcos reflejos operan directamente desde la médula espinal para protegernos del peligro antes de que el cerebro procese el dolor.",
    thumbnail: "/images/imagen-corazon.webp",
    duration: "12 min",
    difficulty: "Medio",
  },
];

export const biologiaCarousel = [
  {
    id: 301,
    title: "El corazon",
    summary:
      "El corazon, un organo vital del cuerpo humano, es responsable de bombear sangre...",
    fullDescription:
      "El corazón es un órgano muscular hueco que bombea sangre oxigenada a todo el cuerpo y sangre desoxigenada a los pulmones. Conoce su anatomía: aurículas, ventrículos y válvulas.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "8 min",
    difficulty: "Fácil",
  },
  {
    id: 302,
    title: "El higado",
    summary:
      "El higado es un organo vital del cuerpo humano, encargado de filtrar toxinas...",
    fullDescription:
      "El hígado realiza más de 500 funciones vitales, incluyendo la filtración de la sangre, la producción de bilis para la digestión y el almacenamiento de glucógeno y vitaminas.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "12 min",
    difficulty: "Fácil",
  },
  {
    id: 303,
    title: "El pulmón",
    summary: "Órganos esenciales para la respiración...",
    fullDescription:
      "Los pulmones son el centro del sistema respiratorio. En esta sesión veremos cómo ocurre el intercambio de gases en los alvéolos, permitiendo que el oxígeno entre a la sangre.",
    thumbnail: "/images/imagen-corazon.webp",
    duration: "8 min",
    difficulty: "Fácil",
  },
  {
    id: 304,
    title: "El riñón",
    summary: "Los filtros naturales del cuerpo humano...",
    fullDescription:
      "Descubre cómo los riñones filtran los desechos y el exceso de líquidos de la sangre, transformándolos en orina, y cómo regulan el equilibrio químico del cuerpo.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "10 min",
    difficulty: "Medio",
  },
  {
    id: 305,
    title: "El estómago",
    summary: "El primer gran paso de la digestión...",
    fullDescription:
      "Exploraremos el ambiente altamente ácido del estómago, las enzimas que descomponen los alimentos y cómo la mucosa gástrica se protege a sí misma.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "6 min",
    difficulty: "Fácil",
  },
  {
    id: 306,
    title: "El intestino",
    summary: "Donde ocurre la absorción de nutrientes...",
    fullDescription:
      "Un viaje a través del intestino delgado y grueso, entendiendo la microbiota intestinal y cómo nuestro cuerpo absorbe los nutrientes vitales para sobrevivir.",
    thumbnail: "/images/imagen-corazon.webp",
    duration: "12 min",
    difficulty: "Medio",
  },
];

export const astronomiaCarousel = [
  {
    id: 401,
    title: "El sol",
    summary:
      "El sol es la estrella más cercana a la Tierra y la fuente principal de energía...",
    fullDescription:
      "El Sol es una enana amarilla compuesta principalmente de hidrógeno y helio. Aprende sobre la fusión nuclear en su núcleo, sus capas externas y cómo su viento solar afecta a los planetas.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "8 min",
    difficulty: "Fácil",
  },
  {
    id: 402,
    title: "materia oscura",
    summary:
      "La materia oscura es una forma de materia que no emite ni refleja luz...",
    fullDescription:
      "Aunque no podemos verla, sabemos que existe por su efecto gravitacional en las galaxias. Esta sesión explora los misterios de la materia oscura, que compone aproximadamente el 27% del universo.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "12 min",
    difficulty: "Fácil",
  },
  {
    id: 403,
    title: "Agujeros negros",
    summary: "Regiones del espacio con una gravedad ineludible...",
    fullDescription:
      "Descubre qué sucede cuando una estrella masiva colapsa sobre sí misma creando una singularidad, y explora conceptos como el horizonte de sucesos y la espaguetización.",
    thumbnail: "/images/imagen-corazon.webp",
    duration: "8 min",
    difficulty: "Fácil",
  },
  {
    id: 404,
    title: "Exoplanetas",
    summary: "Mundos más allá de nuestro sistema solar...",
    fullDescription:
      "Cómo los astrónomos descubren planetas orbitando otras estrellas utilizando el método de tránsito y la velocidad radial, y la búsqueda de zonas habitables.",
    thumbnail: "/images/imagen-hipocampo.webp",
    duration: "10 min",
    difficulty: "Medio",
  },
  {
    id: 405,
    title: "Las galaxias",
    summary: "Ciudades estelares en el vasto universo...",
    fullDescription:
      "Desde espirales como nuestra Vía Láctea hasta elípticas e irregulares. Veremos cómo se forman, evolucionan y colisionan estas gigantescas estructuras cósmicas.",
    thumbnail: "/images/imagen-neurona.jpg",
    duration: "6 min",
    difficulty: "Fácil",
  },
  {
    id: 406,
    title: "El Big Bang",
    summary: "El origen del universo conocido...",
    fullDescription:
      "Un recorrido por los primeros instantes de la creación. Cómo el universo pasó de ser un punto infinitamente denso y caliente a la vasta expansión que observamos hoy en día.",
    thumbnail: "/images/imagen-corazon.webp",
    duration: "12 min",
    difficulty: "Medio",
  },
];

// 3. Función para buscar sesiones dinámicas
// Nota: Excluimos intencionalmente 'continueWatching' para evitar errores de ruta
export function getSessionById(id) {
  const allStandardSessions = [
    ...popularCarousel,
    ...neurocienciaCarousel,
    ...biologiaCarousel,
    ...astronomiaCarousel,
  ];

  return allStandardSessions.find((session) => session.id === Number(id));
}
