export const conferences = [
  {
    id: 1,
    title: "Introducción al Brewing Tradicional",
    speaker: "Lucía Fernández",
    time: "09:00 - 10:30",
    description: "Explora los principios básicos del brewing tradicional y su evolución histórica.",
    fullDescription: "Lucía Fernández te llevará a través de los orígenes del brewing, desde las primeras recetas hasta las técnicas modernas. Aprenderás sobre los ingredientes esenciales y cómo han influido en el desarrollo de la cerveza artesanal a lo largo del tiempo, con énfasis en métodos sostenibles.",
    topics: [
      "Historia del brewing",
      "Ingredientes fundamentales",
      "Técnicas tradicionales",
      "Sostenibilidad en el proceso"
    ],
    image: require('./assets/brew1.png'),
    location: {
      latitude: -32.48455,
      longitude: -58.23206,
      address: "Plaza Ramírez, Concepción del Uruguay"
    }
  },
  {
    id: 2,
    title: "El Arte del Dry Hopping",
    speaker: "Pedro Sánchez",
    time: "11:00 - 12:30",
    description: "Domina el dry hopping para potenciar los aromas de tus cervezas.",
    fullDescription: "Pedro Sánchez, experto en lúpulos, te enseñará las mejores prácticas para aplicar dry hopping. Descubrirás cómo elegir lúpulos, optimizar tiempos de adición y crear perfiles aromáticos únicos que diferencien tu cerveza en el mercado.",
    topics: [
      "Selección de lúpulos",
      "Técnicas de dry hopping",
      "Optimización de aromas",
      "Impacto en el mercado"
    ],
    image: require('./assets/brew2.png'),
    location: {
      latitude: -32.48827,
      longitude: -58.21539,
      address: "Costanera del Uruguay, Isla del Puerto"
    }
  },
  {
    id: 3,
    title: "Cervezas de Trigo: Estilos y Secretos",
    speaker: "Ana Martínez",
    time: "13:00 - 14:30",
    description: "Aprende a elaborar cervezas de trigo con técnicas específicas.",
    fullDescription: "Ana Martínez explorará los secretos detrás de las cervezas de trigo, como hefeweizen y witbier. Incluye una demostración de cómo manejar la turbidez y los ésteres frutales para lograr un perfil característico y delicioso.",
    topics: [
      "Tipos de cervezas de trigo",
      "Control de turbidez",
      "Ésteres frutales",
      "Elaboración práctica"
    ],
    image: require('./assets/brew3.png'),
    location: {
      latitude: -32.42697,
      longitude: -58.22395,
      address: "Palacio San José Museum Area"
    }
  },
  {
    id: 4,
    title: "Automatización en la Cervecería",
    speaker: "Jorge Pérez",
    time: "15:00 - 16:30",
    description: "Incorpora tecnología para optimizar la producción cervecera.",
    fullDescription: "Jorge Pérez presentará soluciones de automatización para cervecerías, desde sistemas de control de temperatura hasta monitoreo en tiempo real. Ideal para quienes buscan escalar su producción sin perder calidad artesanal.",
    topics: [
      "Sistemas de control",
      "Monitoreo en tiempo real",
      "Escalabilidad",
      "Mantenimiento tecnológico"
    ],
    image: require('./assets/brew4.png'),
    location: {
      latitude: -32.47524,
      longitude: -58.24203,
      address: "Terminal de Ómnibus, Zona Centro"
    }
  },
  {
    id: 5,
    title: "Cervezas Ahumadas: Un Viaje Sensorial",
    speaker: "Elena Gómez",
    time: "17:00 - 18:30",
    description: "Descubre el fascinante mundo de las cervezas ahumadas.",
    fullDescription: "Elena Gómez te guiará en la elaboración de cervezas ahumadas, explorando malts ahumados y técnicas de tostado. Incluye una cata de estilos como rauchbier para entender su complejidad sensorial.",
    topics: [
      "Malts ahumados",
      "Técnicas de tostado",
      "Cata de rauchbier",
      "Perfil sensorial"
    ],
    image: require('./assets/brew5.png'),
    location: {
      latitude: -32.49581,
      longitude: -58.22965,
      address: "Barrio Universitario, near UTN"
    }
  },
  {
    id: 6,
    title: "Legislación Cervecera en Argentina",
    speaker: "Martín Ruiz",
    time: "09:00 - 10:30 (Día 2)",
    description: "Conoce las normativas para operar una cervecería legalmente.",
    fullDescription: "Martín Ruiz, abogado especializado en industria alimenticia, explicará las leyes y regulaciones para cervecerías en Argentina. Aprenderás sobre licencias, impuestos y requisitos sanitarios para evitar problemas legales.",
    topics: [
      "Licencias y permisos",
      "Impuestos cerveceros",
      "Requisitos sanitarios",
      "Cumplimiento legal"
    ],
    image: require('./assets/brew6.png'),
    location: {
      latitude: -32.49361,
      longitude: -58.21231,
      address: "Zona Industrial, near Cervecerías"
    }
  },
  {
    id: 7,
    title: "Fermentación a Baja Temperatura",
    speaker: "Clara Díaz",
    time: "11:00 - 12:30 (Día 2)",
    description: "Técnicas para fermentaciones de estilo lager.",
    fullDescription: "Clara Díaz enseñará las claves para fermentar a bajas temperaturas, esenciales para estilos lager. Incluye consejos sobre control de levaduras y equipos adecuados para mantener la consistencia.",
    topics: [
      "Control de temperatura",
      "Selección de levaduras",
      "Equipos necesarios",
      "Consistencia en lagers"
    ],
    image: require('./assets/brew7.png'),
    location: {
      latitude: -32.48206,
      longitude: -58.23085,
      address: "Museo Casa Delio Panizza, Área Histórica"
    }
  },
  {
    id: 8,
    title: "Diseño de Etiquetas Impactantes",
    speaker: "Sofía Ramírez",
    time: "13:00 - 14:30 (Día 2)",
    description: "Crea etiquetas que hagan destacar tu cerveza en el mercado.",
    fullDescription: "Sofía Ramírez, diseñadora gráfica, te guiará en el diseño de etiquetas atractivas y funcionales. Aprenderás sobre branding, normativa de etiquetado y tendencias actuales en el sector cervecero.",
    topics: [
      "Branding cervecero",
      "Normativa de etiquetado",
      "Tendencias de diseño",
      "Impacto visual"
    ],
    image: require('./assets/brew8.png'),
    location: {
      latitude: -32.4859,
      longitude: -58.2183,
      address: "Club Social, Zona Norte"
    }
  },
  {
    id: 9,
    title: "Cervezas y Gastronomía Local",
    speaker: "Tomás López",
    time: "15:00 - 16:30 (Día 2)",
    description: "Combina cervezas con platos típicos de tu región.",
    fullDescription: "Tomás López explorará cómo maridar cervezas artesanales con la gastronomía local. Incluye una demostración de emparejamientos con platos argentinos y consejos para crear menús cerveceros.",
    topics: [
      "Maridaje con platos locales",
      "Creación de menús",
      "Cata práctica",
      "Cultura gastronómica"
    ],
    image: require('./assets/brew9.png'),
    location: {
      latitude: -32.4743,
      longitude: -58.2286,
      address: "Parque Unzué, Área Recreativa"
    }
  },
  {
    id: 10,
    title: "Sostenibilidad en la Cadena Cervecera",
    speaker: "Valeria Ortiz",
    time: "17:00 - 18:30 (Día 2)",
    description: "Estrategias para una producción cervecera más sostenible.",
    fullDescription: "Valeria Ortiz discutirá cómo implementar prácticas sostenibles en toda la cadena de producción cervecera, desde la materia prima hasta el reciclaje de envases, con ejemplos prácticos y certificaciones ecológicas.",
    topics: [
      "Uso de materia prima sostenible",
      "Reciclaje de envases",
      "Certificaciones ecológicas",
      "Prácticas sostenibles"
    ],
    image: require('./assets/brew10.png'),
    location: {
      latitude: -32.50115,
      longitude: -58.22885,
      address: "Camping Municipal, Zona Río"
    }
  }
];