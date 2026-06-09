(function () {
  "use strict";

  /* =========================================================================
     NIVEX SpA — Datos de marca y contenido editable
     -------------------------------------------------------------------------
     Este archivo concentra TODO el texto del sitio. Para editar el contenido
     no necesitas tocar el diseño: cambia los valores aquí y guarda.
     El panel de administración (admin/) escribe sobre esta misma estructura.
     ========================================================================= */

  window.__BRAND__ = {
    name: "NIVEX SpA",
    tagline: "Construyendo hogares, fortaleciendo comunidades.",
    location: "Quilpué, Región de Valparaíso, Chile",
    email: "contacto@nivex.cl",
    phone: "",
    year: "2025",

    hero: {
      kicker: "Asesoría · Cooperativas Cerradas de Vivienda",
      title: "El camino claro hacia la <em>vivienda propia</em>.",
      sub: "Acompañamos a grupos organizados en la creación de cooperativas cerradas de vivienda, desde la primera reunión hasta la postulación ante SERVIU.",
      ctaPrimary: "Conversemos",
      ctaSecondary: "Cómo trabajamos"
    },

    stats: [
      { value: 34, suffix: "", label: "Socios activos" },
      { value: 100, suffix: "%", label: "Crecimiento orgánico" },
      { value: 2025, suffix: "", label: "Año de constitución", raw: true }
    ],

    // Pilares del modelo cooperativo cerrado
    model: {
      intro: "Una organización donde entre 5 y 70 socios se unen para conformar de manera colectiva una cooperativa cerrada de vivienda y postular a programas habitacionales del Estado. Todos participan en las decisiones de la asamblea.",
      pillars: [
        { icon: "vote", title: "Mayor compromiso", text: "Todos los socios conocen el objetivo y participan activamente. Un miembro, un voto." },
        { icon: "shield", title: "Transparencia total", text: "El grupo cerrado permite rendición de cuentas clara. La Junta de Vigilancia fiscaliza la gestión." },
        { icon: "rocket", title: "Eficiencia en gestión", text: "Menos burocracia, decisiones más rápidas y una postulación más sólida ante SERVIU." }
      ]
    },

    // Programa de asesoría — tarjetas
    program: [
      { icon: "gavel", title: "Formación legal", text: "Asesoría en constitución, estatutos, inscripción en registros y cumplimiento normativo." },
      { icon: "target", title: "Estrategia de postulación", text: "Diseño de una estrategia eficiente para postular a programas habitacionales MINVU/SERVIU." },
      { icon: "users", title: "Capacitación de directivas", text: "Formación práctica para gerentes, presidentes, secretarios y tesoreros en gestión cooperativa." },
      { icon: "compass", title: "Acompañamiento continuo", text: "Seguimiento durante todo el proceso de conformación hasta la fecha previa de postulación." }
    ],

    // Qué incluye
    includes: [
      "Diagnóstico inicial de la organización.",
      "Revisión y apoyo en la redacción de estatutos.",
      "Capacitación presencial y/o virtual para la directiva.",
      "Orientación para el proceso de postulación MINVU.",
      "Plantillas de documentos (actas, citaciones y más).",
      "Acompañamiento durante el primer ciclo de postulación.",
      "Acceso a nuestra red de contactos institucionales.",
      "Sesiones de seguimiento post-postulación (según plan)."
    ],

    // Proceso paso a paso
    process: [
      { n: "01", title: "Incorporación de socios", text: "Explicamos en detalle el modelo de la cooperativa cerrada y abordamos los procesos generales hasta su conformación." },
      { n: "02", title: "Documentación", text: "Analizamos la documentación de cada socio para determinar si califica como postulante según los requisitos." },
      { n: "03", title: "Formalización legal", text: "Estatutos, escritura de conformación, publicaciones legales y trámites necesarios, acompañados paso a paso." },
      { n: "04", title: "Seguimiento activo", text: "Orientación permanente respecto a la formalización y soporte técnico cuando se requiera." },
      { n: "05", title: "Enlace con SERVIU", text: "Vinculación y presentación ante el departamento encargado de los llamados DS49." }
    ],

    // Por qué nosotros
    why: [
      { icon: "star", title: "Experiencia real", text: "No somos consultores teóricos. Vivimos el proceso como cooperativistas y lo conocemos desde adentro." },
      { icon: "rocket", title: "Gestión eficiente", text: "Obtuvimos nuestras autorizaciones con rapidez gracias a una directiva comprometida y organizada." },
      { icon: "users", title: "Cercanía", text: "Hablamos el mismo idioma. Entendemos las dificultades porque las hemos enfrentado nosotros mismos." },
      { icon: "heart", title: "Propósito genuino", text: "Nuestra motivación es que más familias accedan a una vivienda con la calidad de asesoría que sabemos brindar." }
    ],

    // Próximos pasos
    steps: [
      { n: "1", title: "Conversación inicial", text: "Nos reunimos a conversar sobre su cooperativa, sus necesidades y objetivos, y definimos los costos." },
      { n: "2", title: "Diagnóstico", text: "Evaluamos el estado actual de su organización y diseñamos un plan de trabajo adaptado a su realidad." },
      { n: "3", title: "Manos a la obra", text: "Comenzamos el acompañamiento paso a paso, desde el inicio hasta la conformación legal." }
    ],

    // Valores
    values: ["Transparencia", "Profesionalismo", "Compromiso", "Responsabilidad", "Gestión eficiente", "Cercanía"],

    // Otras áreas de asesoría (NIVEX es multiservicio)
    areas: [
      "Asesoría administrativa", "Asesoría contable y tributaria", "Asesoría jurídica preventiva",
      "Gestión inmobiliaria", "Tramitación de documentos", "Constitución y formalización de empresas",
      "Gestión municipal y permisos", "Recursos humanos y contratos", "Apoyo a emprendedores y pymes",
      "Administración documental", "Coordinación logística y operativa", "Asistencia en plataformas gubernamentales"
    ]
  };
})();
