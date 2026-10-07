import { DamaDimension, BusinessDriver } from '../types/dama';

export const BUSINESS_DRIVERS: BusinessDriver[] = [
  {
    id: 'customer_360',
    name: 'Visión Cliente 360° y Personalización',
    tagline: 'Fidelización, omnicanalidad y experiencia unificada',
    description: 'Consolidar la información del cliente dispersa en canales y sistemas para personalizar ofertas y aumentar el Customer Lifetime Value (LTV).',
    criticalDimensions: ['master_data', 'data_quality', 'metadata_catalog'],
    businessRisksIfFails: [
      'Campañas de marketing duplicadas o contradictorias',
      'Deserción de clientes por experiencias incoherentes',
      'Reportes de ventas con cifras dispares entre canales'
    ]
  },
  {
    id: 'regulatory_compliance',
    name: 'Cumplimiento Normativo y Auditoría',
    tagline: 'Protección de datos, solvencia y mitigación de multas',
    description: 'Garantizar el estricto cumplimiento de normativas como Protección de Datos Personales (GDPR/locales), BCBS 239, SOX o normativas sanitarias y financieras.',
    criticalDimensions: ['security_privacy', 'gov_framework', 'metadata_catalog'],
    businessRisksIfFails: [
      'Sanciones económicas y multas millonarias de entes reguladores',
      'Daño reputacional irreparable por fugas de datos confidenciales',
      'Fallas graves en auditorías externas'
    ]
  },
  {
    id: 'operational_efficiency',
    name: 'Eficiencia Operativa y Reducción de Costes',
    tagline: 'Eliminación de reprocesos, conciliaciones manuales y silos',
    description: 'Automatizar flujos de datos para eliminar hojas de cálculo paralelas, tareas manuales de conciliación y retrasos en la toma de decisiones.',
    criticalDimensions: ['data_quality', 'architecture_analytics', 'master_data'],
    businessRisksIfFails: [
      'Horas hombre desperdiciadas en conciliar Excel vs ERP',
      'Decisiones operativas lentas y basadas en datos obsoletos',
      'Ineficiencias severas en cadena de suministro e inventarios'
    ]
  },
  {
    id: 'ai_analytics_innovation',
    name: 'Innovación con IA y Analítica Avanzada',
    tagline: 'Modelos predictivos, IA generativa y autoservicio confiable',
    description: 'Alimentar modelos de Machine Learning e Inteligencia Artificial con datos limpios, contextualizados y gobernados para asegurar resultados no sesgados.',
    criticalDimensions: ['architecture_analytics', 'data_quality', 'metadata_catalog'],
    businessRisksIfFails: [
      'Modelos de IA con alucinaciones o decisiones sesgadas',
      'Falta de adopción de herramientas de BI por desconfianza en los números',
      'Inversiones millonarias en IA sin retorno tangible para el negocio'
    ]
  },
  {
    id: 'cloud_modernization',
    name: 'Modernización Cloud y Arquitectura Moderna',
    tagline: 'Migración a Lakehouse, gobernanza en la nube y escalabilidad',
    description: 'Evolucionar la infraestructura tecnológica hacia plataformas de datos modernas evitando transferir el desorden del servidor local a la nube.',
    criticalDimensions: ['architecture_analytics', 'security_privacy', 'gov_framework'],
    businessRisksIfFails: [
      'Sobrecostos descontrolados en plataformas cloud',
      'Proliferación de "Data Swamps" (pantanos de datos ingobernables)',
      'Brechas de seguridad por configuraciones laxas en la nube'
    ]
  },
  {
    id: 'risk_security',
    name: 'Gestión Integral de Riesgos y Ciberseguridad',
    tagline: 'Continuidad operativa, protección de propiedad intelectual y fraude',
    description: 'Blindar los activos de información críticos de la empresa ante ciberataques, fugas internas y fraudes transaccionales.',
    criticalDimensions: ['security_privacy', 'gov_framework', 'data_quality'],
    businessRisksIfFails: [
      'Filtraciones de fórmulas, estrategias comerciales o patentes',
      'Paralización operativa por ransomware o indisponibilidad de datos',
      'Vulnerabilidad ante fraudes internos no detectados'
    ]
  }
];

export const DAMA_DIMENSIONS: DamaDimension[] = [
  {
    id: 'gov_framework',
    name: 'Gobierno de Datos, Roles y Organización',
    shortName: 'Gobierno & Roles',
    dmbokChapter: 'DAMA-DMBOK2 Cap. 3: Data Governance',
    iconName: 'ShieldCheck',
    description: 'Estructura organizativa, comités ejecutivos, asignación de responsabilidades de propiedad (Owners) y custodia (Stewards).',
    strategicImportance: 'Sin patrocinio ejecutivo ni roles claros en las áreas de negocio, cualquier iniciativa técnica de datos fracasa.',
    questions: [
      {
        id: 'q_gov_council',
        dimensionId: 'gov_framework',
        title: 'Consejo Directivo y Comité de Gobierno de Datos',
        businessContext: '¿La alta dirección (C-Level / Gerencias Generales) participa en un órgano formal que prioriza y decide sobre las políticas e inversiones en datos?',
        damaRef: 'DMBOK2 3.2.1: Data Governance Bodies (Council & Steering Committee)',
        weight: 1.2,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Inexistente / Reactivo',
            shortDesc: 'No existe ningún comité ni interés visible de la dirección.',
            detailedCriteria: 'Las decisiones sobre datos se delegan exclusivamente a TI como un problema de infraestructura. No hay patrocinio ejecutivo.',
            evidenceExample: 'Cualquier problema de datos se escala a TI como un ticket de soporte técnico.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Informal / Departamental',
            shortDesc: 'Reuniones esporádicas cuando surge una crisis.',
            detailedCriteria: 'Existen reuniones ad-hoc entre gerentes cuando surge una auditoría o una falla grave de reportes, pero sin agenda periódica ni autoridad formal.',
            evidenceExample: 'Reuniones de emergencia tras detectar discrepancias graves en el cierre financiero anual.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Formalizado / Comité Activo',
            shortDesc: 'Comité de Gobierno constituido con reuniones periódicas.',
            detailedCriteria: 'Existe un Comité de Gobierno de Datos formalizado con acta de constitución, liderado por directivos de negocio y TI con sesiones regulares trimestrales.',
            evidenceExample: 'Comité mensual con agenda documentada, resolución de prioridades y patrocinio del CFO o CDO.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Cuantitativo / Conducción Estratégica',
            shortDesc: 'El comité evalúa KPIs de gobierno y retorno de inversión.',
            detailedCriteria: 'El Comité evalúa paneles de control de salud del dato, asigna presupuesto basado en valor de negocio y mide el impacto de cada dominio de datos.',
            evidenceExample: 'Dashboard del comité que muestra avance de metas de calidad y ROI de iniciativas de datos.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Proactivo / Gobernanza Adaptativa',
            shortDesc: 'Gobernanza ágil integrada a la junta directiva y cultura corporativa.',
            detailedCriteria: 'El gobierno de datos es parte de la estrategia corporativa permanente; el Comité aprueba éticas de IA y modelos de innovación acelerada.',
            evidenceExample: 'El gobierno de datos se reporta directamente en las asambleas de accionistas o balance integrado.'
          }
        }
      },
      {
        id: 'q_data_stewards',
        dimensionId: 'gov_framework',
        title: 'Roles de Negocio: Data Owners y Data Stewards',
        businessContext: '¿Existen responsables explícitos en las áreas funcionales (Finanzas, Ventas, Operaciones) que responden por la definición y calidad de sus datos?',
        damaRef: 'DMBOK2 3.2.2: Data Stewardship Roles (Business Owners, Stewards, Custodians)',
        weight: 1.1,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Sin responsables identificados',
            shortDesc: '"Los datos son de TI" o "los datos son de todos y de nadie".',
            detailedCriteria: 'Nadie en las áreas de negocio asume la responsabilidad del dato; cuando un dato está mal, se culpa al sistema.',
            evidenceExample: 'Ante clientes duplicados, Ventas dice que el CRM funciona mal y no revisa su proceso de alta.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Responsables implícitos o accidentales',
            shortDesc: 'Ciertas personas resuelven dudas por antigüedad o buena voluntad.',
            detailedCriteria: 'Hay analistas clave a los que todos consultan por su conocimiento histórico, pero no tienen el rol formal ni tiempo asignado en su descripción de puesto.',
            evidenceExample: '"Pregúntale a María de Operaciones, ella es la única que sabe qué significa esa columna".'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Roles formales asignados',
            shortDesc: 'Data Owners y Data Stewards designados con funciones escritas.',
            detailedCriteria: 'Se han nombrado formalmente Data Owners (nivel gerencial) y Data Stewards (nivel operativo) con responsabilidades explícitas en sus KPIs o perfiles.',
            evidenceExample: 'Manual de roles con matriz RACI por dominio de datos (ej. Gerente de Clientes es Data Owner).'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Red activa de Stewards con incentivos',
            shortDesc: 'Comunidad de custodia activa con métricas de desempeño.',
            detailedCriteria: 'Los Data Stewards dedican tiempo formal programado, participan en foros de resolución de inconsistencias cruzadas y sus evaluaciones incluyen métricas de datos.',
            evidenceExample: 'Reuniones quincenales de Stewards con registro de incidencias resueltas y tiempo medio de respuesta.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Custodia distribuida de clase mundial',
            shortDesc: 'Custodia automatizada y colaborativa tipo Data Mesh.',
            detailedCriteria: 'La custodia es parte natural del trabajo diario; equipos de dominio publican productos de datos gobernados con contratos de datos autónomos.',
            evidenceExample: 'Contratos de datos (Data Contracts) autogestionados por cada equipo de producto digital.'
          }
        }
      },
      {
        id: 'q_operating_model',
        dimensionId: 'gov_framework',
        title: 'Modelo Operativo y Oficina de Gobierno de Datos (DGO)',
        businessContext: '¿La empresa cuenta con procesos estandarizados para tramitar cambios de reglas, solicitudes de acceso y resolución de conflictos entre áreas?',
        damaRef: 'DMBOK2 3.3: Operating Models & DGO Implementation',
        weight: 1.0,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Procesos inexistentes',
            shortDesc: 'Disputas interminables sin árbitro ni mecanismo de resolución.',
            detailedCriteria: 'Cuando Finanzas y Comercial no coinciden en una métrica, no hay procedimiento ni entidad que defina la verdad.',
            evidenceExample: 'Reuniones de directorio donde se debaten 40 minutos cuál cifra de ventas es la real.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Iniciativas aisladas',
            shortDesc: 'Un departamento intenta ordenar sus datos sin coordinación global.',
            detailedCriteria: 'Finanzas crea sus propios estándares pero Comercial y Logística usan definiciones incompatibles.',
            evidenceExample: 'El área de Marketing crea su propio data mart ignorando las reglas corporativas.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: DGO o función coordinadora establecida',
            shortDesc: 'Modelo federado o centralizado con procesos claros.',
            detailedCriteria: 'Existe un equipo o líder de Gobierno (DGO) que facilita acuerdos, gestiona el catálogo y canaliza incidentes mediante un flujo formal.',
            evidenceExample: 'Flujo documentado para solicitar una nueva definición en el glosario o reportar un error de dato.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Modelo operativo institucionalizado',
            shortDesc: 'SLA definidos y gestión de la demanda de datos integrada.',
            detailedCriteria: 'El DGO monitorea acuerdos de nivel de servicio (SLAs) para la resolución de disputas y la entrega de activos gobernados.',
            evidenceExample: 'Tiempos de atención menores a 5 días para cambios en definiciones y auditorías periódicas de cumplimiento.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Gobierno ágil y continuo',
            shortDesc: 'Gobernanza embebida en pipelines CI/CD y ciclos de producto.',
            detailedCriteria: 'El modelo operativo se adapta a la velocidad del negocio con gobernanza por diseño (Governance by Design).',
            evidenceExample: 'Nuevos productos de datos nacen certificados automáticamente mediante flujos de autoservicio.'
          }
        }
      }
    ]
  },
  {
    id: 'strategy_culture',
    name: 'Estrategia, Políticas y Cultura de Datos',
    shortName: 'Estrategia & Cultura',
    dmbokChapter: 'DAMA-DMBOK2 Cap. 1 & 3: Strategy, Principles & Culture',
    iconName: 'Compass',
    description: 'Alineación de la estrategia de datos con los objetivos del negocio, políticas documentadas y alfabetización de los colaboradores.',
    strategicImportance: 'El valor de los datos se materializa únicamente cuando apalanca la ventaja competitiva y las personas saben utilizarlos éticamente.',
    questions: [
      {
        id: 'q_strategy_alignment',
        dimensionId: 'strategy_culture',
        title: 'Alineación de la Estrategia de Datos con la Visión Corporativa',
        businessContext: '¿La iniciativa de datos tiene casos de uso de negocio con ROI medible, o es vista como un fin tecnológico en sí mismo?',
        damaRef: 'DMBOK2 1.3: Data Management Strategy and Business Alignment',
        weight: 1.3,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Desconexión total',
            shortDesc: 'No hay estrategia de datos o es puramente técnica.',
            detailedCriteria: 'La gerencia general no percibe vínculo entre los datos y la rentabilidad; las inversiones en datos no tienen caso de negocio claro.',
            evidenceExample: 'Compra de licencias de software sin objetivos claros de negocio asociados.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Alineación táctica puntual',
            shortDesc: 'Proyectos aislados con valor local pero sin hoja de ruta.',
            detailedCriteria: 'Se aprueban proyectos de datos para resolver urgencias puntuales (ej. un reporte para un regulador), pero sin una visión holística.',
            evidenceExample: 'Iniciativa de analítica solo en el área de créditos sin conexión con la estrategia de captación.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Estrategia de Datos formalizada',
            shortDesc: 'Plan maestro de datos vinculado a los pilares estratégicos.',
            detailedCriteria: 'Existe un documento de Data Strategy aprobado por el Comité de Dirección que prioriza casos de uso con base en objetivos estratégicos.',
            evidenceExample: 'Estrategia de datos con 3 ejes clave: Reducción de Churn, Eficiencia Logística y Cumplimiento Normativo.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Gestión por valor y medición de ROI',
            shortDesc: 'Portafolio de iniciativas priorizado por valor económico neto.',
            detailedCriteria: 'Cada iniciativa de gobierno y datos cuantifica su impacto económico (aumento de ingresos o ahorro de costes) y se monitorea en OKRs.',
            evidenceExample: 'Cuadro de mando que muestra que el gobierno de datos aportó $2.4M en reducción de inventario inmovilizado.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Empresa verdaderamente Data-Driven',
            shortDesc: 'Los datos son un activo estratégico diferenciador en el mercado.',
            detailedCriteria: 'La estrategia corporativa se formula a partir de las capacidades y monetización de los activos de datos de la organización.',
            evidenceExample: 'La empresa comercializa productos de información o basa su modelo de negocio en analítica prescriptiva.'
          }
        }
      },
      {
        id: 'q_policies_standards',
        dimensionId: 'strategy_culture',
        title: 'Políticas, Estándares y Normas de Datos',
        businessContext: '¿Existen reglas escritas y obligatorias sobre cómo crear, clasificar, retener y eliminar datos en toda la organización?',
        damaRef: 'DMBOK2 3.2.4: Data Policies and Principles',
        weight: 1.0,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Reglas no escritas / Ausentes',
            shortDesc: 'Cada empleado gestiona los datos como le parece conveniente.',
            detailedCriteria: 'No hay políticas documentadas sobre retención, nombres de variables o acceso a datos sensibles.',
            evidenceExample: 'Cualquier usuario exporta bases completas a su laptop personal sin restricción.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Políticas genéricas de TI no aplicadas',
            shortDesc: 'Documentos guardados en carpetas que nadie conoce ni cumple.',
            detailedCriteria: 'Existe una política genérica de seguridad redactada por TI hace 4 años, pero no aborda el ciclo de vida del dato ni se fiscaliza.',
            evidenceExample: 'Políticas redactadas en PDFs inaccesibles que ningún usuario de negocio ha leído.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Políticas de Gobierno publicadas y comunicadas',
            shortDesc: 'Políticas vigentes aprobadas por el Comité y difundidas.',
            detailedCriteria: 'Se cuenta con un marco de políticas de datos (clasificación, calidad, retención, seguridad) con revisiones anuales y canales de consulta.',
            evidenceExample: 'Política corporativa de retención y ciclo de vida de datos con lineamientos claros para cada área.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Cumplimiento auditado y medido',
            shortDesc: 'Auditorías regulares y métricas de adhesión a políticas.',
            detailedCriteria: 'Existen controles automatizados e inspecciones que reportan violaciones a las políticas de datos con sanciones y planes de acción.',
            evidenceExample: 'Reporte trimestral de cumplimiento normativo presentado al comité de auditoría.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Políticas como código (Policy-as-Code)',
            shortDesc: 'Aplicación automatizada de reglas en toda la infraestructura.',
            detailedCriteria: 'Las políticas se aplican automáticamente en los pipelines de datos mediante controles programáticos y enmascaramiento dinámico.',
            evidenceExample: 'Sistemas que impiden físicamente ingresar o mover datos sin metadata y validación de seguridad previa.'
          }
        }
      },
      {
        id: 'q_data_literacy',
        dimensionId: 'strategy_culture',
        title: 'Alfabetización de Datos (Data Literacy) y Gestión del Cambio',
        businessContext: '¿La organización capacita a los profesionales de negocio para interpretar, cuestionar y usar datos con criterio crítico y responsabilidad?',
        damaRef: 'DMBOK2 3.3.4: Organizational Change Management & Literacy',
        weight: 1.1,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Analfabetismo de datos generalizado',
            shortDesc: 'Decisiones basadas exclusivamente en la intuición o jerarquía (HiPPO).',
            detailedCriteria: 'Poca comprensión de conceptos básicos de datos; resistencia general a usar información cuantitativa en decisiones gerenciales.',
            evidenceExample: 'La opinión del jefe de mayor rango prevalece sobre cualquier evidencia en datos.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Capacitaciones técnicas aisladas en herramientas',
            shortDesc: 'Cursos puntuales de Excel o Power BI sin foco conceptual.',
            detailedCriteria: 'Se enseña a usar herramientas de software, pero no a formular preguntas de negocio, entender sesgos o interpretar métricas.',
            evidenceExample: 'Capacitación en Power BI donde los usuarios crean gráficos vistosos pero con interpretaciones erróneas.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Programa formal de alfabetización de datos',
            shortDesc: 'Rutas de aprendizaje diferenciadas por rol de negocio.',
            detailedCriteria: 'La empresa tiene un programa continuo de alfabetización de datos (ej. Data Academy) con módulos de gobernanza, ética y pensamiento analítico.',
            evidenceExample: 'Programa de certificación interna en Data Literacy obligatorio para líderes de producto y gerentes.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Cultura de cuestionamiento basada en evidencia',
            shortDesc: 'Comunidades de práctica activas y métricas de adopción analítica.',
            detailedCriteria: 'Los líderes de negocio justifican sus propuestas con datos certificados; existen foros donde se comparten mejores prácticas y casos de éxito.',
            evidenceExample: 'Comités de producto donde ninguna propuesta se aprueba sin métricas de prueba A/B y datos auditados.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Mentalidad de datos profundamente arraigada',
            shortDesc: 'Innovación continua impulsada por la curiosidad de datos en todos los niveles.',
            detailedCriteria: 'Los colaboradores en todos los estratos proponen mejoras basadas en datos; la ética y el rigor analítico son parte del ADN corporativo.',
            evidenceExample: 'Hackathons internos de datos donde equipos multidisciplinarios crean prototipos de impacto comprobado.'
          }
        }
      }
    ]
  },
  {
    id: 'data_quality',
    name: 'Gestión de Calidad de Datos (Data Quality)',
    shortName: 'Calidad de Datos',
    dmbokChapter: 'DAMA-DMBOK2 Cap. 13: Data Quality Management',
    iconName: 'BadgeCheck',
    description: 'Definición de elementos críticos, dimensiones objetivas de calidad (completitud, exactitud, vigencia) y remediación en causa raíz.',
    strategicImportance: 'Basar decisiones estratégicas en datos defectuosos genera pérdidas millonarias y desconfianza letal en reportes e IA.',
    questions: [
      {
        id: 'q_critical_data_elements',
        dimensionId: 'data_quality',
        title: 'Elementos Críticos de Datos (CDEs) y Priorización',
        businessContext: '¿La empresa sabe cuáles son los 20 o 50 datos vitales que no pueden fallar porque detienen la operación, arruinan las ventas o violan la ley?',
        damaRef: 'DMBOK2 13.2.1: Define Critical Data Elements (CDEs)',
        weight: 1.2,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Sin priorización de datos',
            shortDesc: 'Todos los datos se tratan con el mismo nivel de descuido.',
            detailedCriteria: 'No se diferencian datos transaccionales clave (RUT, saldo contable, dirección fiscal) de campos de texto libre sin impacto.',
            evidenceExample: 'Se gasta el mismo esfuerzo en limpiar comentarios libres que en validar el identificador tributario del cliente.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Priorización empírica no documentada',
            shortDesc: 'Los analistas saben qué columnas son críticas pero no hay consenso formal.',
            detailedCriteria: 'Cada analista conoce por experiencia los campos que suelen fallar, pero no hay un registro corporativo de CDEs vinculado a riesgos de negocio.',
            evidenceExample: 'Un cambio de sistema omite una validación de crédito porque nadie advirtió que era un campo crítico.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Registro oficial de CDEs para procesos prioritarios',
            shortDesc: 'Inventario de Elementos Críticos de Datos con impacto de negocio.',
            detailedCriteria: 'Existe un catálogo de CDEs aprobado para los dominios clave (Finanzas, Clientes, Operaciones) con sus impactos asociados si fallan.',
            evidenceExample: 'Documento oficial con 45 CDEs del proceso comercial vinculados a facturación y márgenes.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Monitoreo continuo de CDEs con SLAs',
            shortDesc: 'Tableros de calidad enfocados específicamente en CDEs.',
            detailedCriteria: 'Los CDEs cuentan con umbrales de aceptación obligatorios y alertas automáticas en caso de degradación.',
            evidenceExample: 'Scorecard semanal que reporta 99.4% de completitud en CDEs de facturación con meta corporativa de 99.0%.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Gestión predictiva y preventiva de CDEs',
            shortDesc: 'Calidad por diseño en la captura de cualquier elemento crítico.',
            detailedCriteria: 'Los CDEs se validan preventivamente en origen (APIs, formularios, sensores) imposibilitando la entrada de datos corruptos al ecosistema.',
            evidenceExample: 'Validación en tiempo real en los microservicios de captación que rechaza cargas con anomalías sintácticas.'
          }
        }
      },
      {
        id: 'q_dq_dimensions_rules',
        dimensionId: 'data_quality',
        title: 'Dimensiones de Calidad y Reglas de Validación',
        businessContext: '¿Se mide la calidad mediante dimensiones objetivas de DAMA (completitud, exactitud, unicidad, consistencia, vigencia y validez)?',
        damaRef: 'DMBOK2 13.2.2: Data Quality Dimensions & Profiling',
        weight: 1.1,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Concepto subjetivo de "buena o mala calidad"',
            shortDesc: '"Los datos están feos", sin ninguna métrica cuantificable.',
            detailedCriteria: 'Las quejas sobre calidad son anécdotas subjetivas; nadie sabe exactamente qué porcentaje de registros está incompleto o duplicado.',
            evidenceExample: 'Quejas en pasillos: "los datos de ventas nunca cuadran", pero sin ningún informe numérico.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Reglas artesanales en scripts SQL o macros Excel',
            shortDesc: 'Validaciones dispersas que cada analista aplica por su cuenta.',
            detailedCriteria: 'Existen scripts individuales de limpieza, pero no reglas corporativas unificadas; si cambia el analista, el criterio se pierde.',
            evidenceExample: 'Un script Python privado que un analista corre antes de enviar el reporte mensual al directorio.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Reglas de calidad estandarizadas y documentadas',
            shortDesc: 'Catálogo de reglas de negocio categorizadas por dimensión DAMA.',
            detailedCriteria: 'Se han documentado reglas formales para dimensiones clave (ej. exactitud de emails, unicidad de IDs, consistencia de monedas) con expectativas de negocio.',
            evidenceExample: 'Regla DQ-CLI-01: "El campo País debe coincidir con la norma ISO-3166 con 100% de vigencia".'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Perfilamiento y monitoreo automatizado',
            shortDesc: 'Herramientas automáticas de Data Quality que generan scorecards periódicos.',
            detailedCriteria: 'Plataforma de calidad que ejecuta perfilamientos programados y calcula índices de salud del dato por dominio funcional.',
            evidenceExample: 'Tablero automatizado que muestra el índice de salud de calidad (94.2%) con desglose por dimensión DAMA.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Calidad inteligente y auto-corrección',
            shortDesc: 'Detección de anomalías con Machine Learning y resolución guiada.',
            detailedCriteria: 'Sistemas inteligentes que aprenden distribuciones normales de datos y alertan sobre derivas o patrones anómalos antes de que afecten al negocio.',
            evidenceExample: 'Algoritmos que detectan picos inusuales de valores nulos o outliers en tiempo real y aplican remediaciones estándar.'
          }
        }
      },
      {
        id: 'q_root_cause_remediation',
        dimensionId: 'data_quality',
        title: 'Gestión de Incidentes y Remediación en Causa Raíz',
        businessContext: 'Cuando un dato falla, ¿se limpia manualmente al final del mes o se corrige el proceso y sistema que originó el error?',
        damaRef: 'DMBOK2 13.2.3: Root Cause Analysis and Issue Management',
        weight: 1.0,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Parche permanente / Limpieza en el reporte',
            shortDesc: 'Se corrigen las celdas en Excel cada mes; el error original sigue vivo.',
            detailedCriteria: 'La organización gasta cientos de horas arreglando el síntoma repetidamente en hojas de cálculo sin avisar al sistema origen.',
            evidenceExample: 'El equipo de Finanzas pasa 3 días de cada cierre mensual arreglando manualmente los códigos de sucursal en Excel.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Corrección por solicitudes de soporte ad-hoc',
            shortDesc: 'Se pide a TI que "corra un update en la base de datos".',
            detailedCriteria: 'Se corrigen registros directamente en bases operativas mediante scripts de emergencia, generando riesgos de auditoría e inconsistencias.',
            evidenceExample: 'Tickets a bases de datos: "Por favor corregir el cliente 4022 en la tabla clientes".'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Flujo formal de gestión de incidencias de datos',
            shortDesc: 'Registro de defectos, análisis de causa raíz y asignación a Stewards.',
            detailedCriteria: 'Existe un canal documentado para reportar defectos de calidad; se convoca al Data Owner para revisar por qué ocurrió la falla en el proceso de captura.',
            evidenceExample: 'Tablero de incidencias de datos con responsable, causa raíz identificada (ej. falta de validación en pantalla de ventas) y fecha de corrección sistémica.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Gestión proactiva con SLAs de remediación',
            shortDesc: 'Compromisos de servicio para solucionar causas raíz en menos de 15 días.',
            detailedCriteria: 'Se miden tiempos de resolución de defectos y se priorizan desarrollos en los sistemas origen para erradicar las causas raíz recurrentes.',
            evidenceExample: 'Métrica trimestral: Reducción del 45% en incidencias recurrentes de captura de inventario.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Mejora continua y diseño a prueba de fallos',
            shortDesc: 'Poka-yoke de datos y retroalimentación sistemática.',
            detailedCriteria: 'Las causas raíz se utilizan para rediseñar los procesos comerciales y de producto; casi ningún error humano puede ingresar al sistema.',
            evidenceExample: 'Procesos de negocio rediseñados con captura asistida que erradicaron al 100% los errores de facturación.'
          }
        }
      }
    ]
  },
  {
    id: 'metadata_catalog',
    name: 'Metadatos, Catálogo y Linaje de Datos',
    shortName: 'Metadatos & Catálogo',
    dmbokChapter: 'DAMA-DMBOK2 Cap. 12: Metadata Management',
    iconName: 'BookOpen',
    description: 'Glosario unificado de negocio, diccionario técnico, catálogo corporativo y trazabilidad (linaje) de datos desde el origen al reporte.',
    strategicImportance: 'Sin lenguaje común, cada departamento mide métricas diferentes; sin linaje, los informes directivos carecen de auditoría y confianza.',
    questions: [
      {
        id: 'q_business_glossary',
        dimensionId: 'metadata_catalog',
        title: 'Glosario de Términos de Negocio (Business Glossary)',
        businessContext: '¿Toda la empresa comparte la misma definición exacta para términos clave como "Cliente Activo", "Venta Neta", "Margen" o "Churn"?',
        damaRef: 'DMBOK2 12.2.1: Business Glossary & Common Vocabulary',
        weight: 1.3,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Torre de Babel terminológica',
            shortDesc: 'Cada área define los mismos términos de manera incompatible.',
            detailedCriteria: 'Ventas define cliente como "quien cotizó", Finanzas como "quien pagó", y Operaciones como "quien tiene servicio activo".',
            evidenceExample: 'Directores discutiendo si la empresa tiene 50,000 o 30,000 clientes activos en la misma junta.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Definiciones locales en glosarios informales',
            shortDesc: 'Cada departamento tiene su lista interna de definiciones en un archivo.',
            detailedCriteria: 'Hay documentos dispersos con definiciones, pero no hay consenso interdepartamental ni fuente canónica accesible.',
            evidenceExample: 'Un documento Word de Finanzas de 2022 que explica sus cálculos, pero desconocido por Marketing.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Glosario corporativo oficial y consensuado',
            shortDesc: 'Repositorio centralizado con términos aprobados por Data Owners.',
            detailedCriteria: 'Existe un Glosario de Negocio accesible para toda la empresa con definiciones únicas, fórmulas matemáticas de KPIs y propietarios asignados.',
            evidenceExample: 'Portal del Glosario Empresarial donde se busca "Cliente Activo" y muestra fórmula, dueño (Gerente Comercial) y sistemas donde vive.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Glosario integrado a herramientas de BI y datos',
            shortDesc: 'Las definiciones se visualizan directamente en reportes y dashboards.',
            detailedCriteria: 'Al pasar el cursor sobre un KPI en Power BI, Tableau o Looker, se despliega la definición oficial del glosario con enlace al linaje.',
            evidenceExample: 'Tooltips en dashboards corporativos que enlazan directamente a la ficha del término en el catálogo institucional.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Ontología semántica viva',
            shortDesc: 'Metadatos semánticos que guían consultas en lenguaje natural y agentes de IA.',
            detailedCriteria: 'El conocimiento empresarial está modelado semánticamente; los modelos de analítica e IA consultan el glosario para garantizar respuestas coherentes.',
            evidenceExample: 'Modelos de GenAI corporativa conectados al glosario de negocio para generar reportes sin ambigüedad.'
          }
        }
      },
      {
        id: 'q_data_lineage',
        dimensionId: 'metadata_catalog',
        title: 'Linaje de Datos (Data Lineage) y Trazabilidad',
        businessContext: '¿La empresa puede rastrear con exactitud el camino de un dato desde que el cliente lo digitó hasta que llegó al reporte del directorio?',
        damaRef: 'DMBOK2 12.2.2: Data Lineage & Provenance',
        weight: 1.1,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Caja negra total',
            shortDesc: 'Nadie sabe de dónde salió un dato en un reporte ejecutivo.',
            detailedCriteria: 'Cuando una cifra parece sospechosa, rastrear su origen requiere semanas de arqueología informática y llamadas telefónicas.',
            evidenceExample: 'El regulador pide justificar una cifra contable y la empresa tarda 3 semanas en reconstruir el origen.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Linaje manual en diagramas estáticos',
            shortDesc: 'Diagramas Visio o PowerPoint desactualizados desde el año pasado.',
            detailedCriteria: 'Alguien documentó el flujo en una presentación durante la implementación, pero cualquier cambio de software rompió la validez del diagrama.',
            evidenceExample: 'Un diagrama en PDF desfasado donde los nombres de tablas ya no existen en la base de datos actual.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Linaje documentado para reportes críticos',
            shortDesc: 'Mapeo verificado de origen a destino para los principales CDEs.',
            detailedCriteria: 'Se tiene mapeado el camino de los datos regulatorios y de finanzas: sistema fuente -> ETL -> Data Warehouse -> Cubo -> Dashboard.',
            evidenceExample: 'Ficha de linaje que muestra las 4 transformaciones que sufre el dato "Saldo Deudor" antes de llegar a la superintendencia.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Linaje técnico automatizado de extremo a extremo',
            shortDesc: 'Herramienta de catálogo que extrae el linaje analizando código SQL y pipelines.',
            detailedCriteria: 'El linaje se actualiza automáticamente al cambiar el código; se puede hacer análisis de impacto (Impact Analysis) antes de modificar una tabla.',
            evidenceExample: 'Grafo de linaje interactivo en la plataforma de datos con visualización a nivel de columna.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Linaje dinámico y gobernanza de impacto en tiempo real',
            shortDesc: 'Trazabilidad bidireccional continua con trazabilidad de modelos de IA.',
            detailedCriteria: 'Trazabilidad instantánea de datos y modelos analíticos; si una fuente se degrada, los reportes finales alertan automáticamente a los usuarios.',
            evidenceExample: 'Alertas en dashboards que avisan si un dato fuente no se actualizó antes de que el usuario tome una decisión.'
          }
        }
      }
    ]
  },
  {
    id: 'master_data',
    name: 'Datos Maestros y de Referencia (MDM)',
    shortName: 'Datos Maestros (MDM)',
    dmbokChapter: 'DAMA-DMBOK2 Cap. 10: Reference & Master Data Management',
    iconName: 'Database',
    description: 'Gestión de la "Única Versión de la Verdad" (Golden Record) para entidades clave: Clientes, Productos, Proveedores, Ubicaciones.',
    strategicImportance: 'Sin datos maestros limpios, los clientes reciben múltiples ofertas, el stock se duplica y los análisis consolidados fallan.',
    questions: [
      {
        id: 'q_mdm_golden_record',
        dimensionId: 'master_data',
        title: 'Registro Único (Golden Record) de Clientes y Productos',
        businessContext: '¿Existe una sola versión canónica de un cliente o producto, o el mismo cliente está registrado 5 veces con nombres distintos en diferentes sistemas?',
        damaRef: 'DMBOK2 10.2.1: Master Data Management & Golden Record Creation',
        weight: 1.2,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Múltiples verdades en silos incomunicados',
            shortDesc: 'Cada sistema tiene su propia versión del cliente o producto.',
            detailedCriteria: 'El ERP, CRM, portal web y sistema de facturación manejan bases separadas; es imposible saber cuántos clientes reales tiene la empresa.',
            evidenceExample: 'Un mismo cliente recibe correos de cobranza y promociones de fidelización simultáneamente con IDs distintos.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Intentos manuales de consolidación',
            shortDesc: 'Cruce periódico de bases de datos mediante hojas de cálculo.',
            detailedCriteria: 'Cada trimestre alguien junta las tablas y trata de identificar duplicados con fórmulas complejas de Excel, sin resolver la duplicidad en origen.',
            evidenceExample: 'Un analista junta el archivo de Salesforce con el de SAP mediante VLOOKUP/BUSCARV una vez al mes.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Definición de identificador maestro y reglas de coincidencia',
            shortDesc: 'Identificador único empresarial acordado con reglas de match.',
            detailedCriteria: 'Se establece qué sistema es la "fuente de la verdad" para cada entidad (ej. CRM para prospectos, ERP para clientes activos) y reglas de deduplicación.',
            evidenceExample: 'Política que prohíbe crear un cliente en facturación sin antes validar su RUT/NIT en el maestro central.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Hub de MDM operativo o sincronización automatizada',
            shortDesc: 'Consolidación de registros mediante algoritmos de coincidencia difusa (Fuzzy Matching).',
            detailedCriteria: 'Plataforma o servicio de MDM que fusiona registros de forma continua, generando el Golden Record y propagándolo a los sistemas satélites.',
            evidenceExample: 'Sistema MDM que detecta que "Juan P. Gómez" y "Juan Pérez Gómez" son la misma persona y los unifica con 98% de confianza.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Gestión de datos maestros omnicanal en tiempo real',
            shortDesc: 'Sincronización instantánea y gobernanza bidireccional.',
            detailedCriteria: 'Cualquier actualización de contacto o catálogo de productos se refleja en milisegundos en todos los canales físicos y digitales.',
            evidenceExample: 'Si un cliente cambia de dirección en la App móvil, la sucursal física y el transportista ven el cambio al instante.'
          }
        }
      },
      {
        id: 'q_reference_data',
        dimensionId: 'master_data',
        title: 'Datos de Referencia y Tablas de Códigos Estándar',
        businessContext: '¿Se comparten tablas estándar de códigos (países, monedas, estados de pedidos, tipos de documentos) o cada sistema inventa sus propios catálogos?',
        damaRef: 'DMBOK2 10.2.2: Reference Data Governance (Standard Code Sets)',
        weight: 1.0,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Caos de catálogos y códigos libres',
            shortDesc: 'Campos de texto libre para países, monedas y estados.',
            detailedCriteria: 'En un sistema se escribe "USA", en otro "EEUU", en otro "Estados Unidos", y en otro "1". No hay estándar común.',
            evidenceExample: 'Tablas donde el género tiene 12 variaciones: "M", "Masculino", "Hombre", "H", "1", espacios en blanco, etc.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Mapeos improvisados en queries SQL',
            shortDesc: 'Cientos de sentencias "CASE WHEN" en cada consulta para homologar.',
            detailedCriteria: 'Los desarrolladores escriben transformaciones complejas para traducir códigos entre aplicaciones sin un catálogo corporativo.',
            evidenceExample: 'Queries de 500 líneas llenas de condiciones para traducir estados de órdenes entre el e-commerce y el almacén.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Catálogo centralizado de datos de referencia',
            shortDesc: 'Tablas maestras de códigos gobernadas con dueño asignado.',
            detailedCriteria: 'Existe un repositorio de tablas de referencia corporativas (normas ISO, códigos de bancos, catálogos del regulador) que las áreas deben reutilizar.',
            evidenceExample: 'Repositorio corporativo de datos de referencia donde solo el Data Steward puede dar de alta un nuevo tipo de producto.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Distribución automatizada vía APIs o eventos',
            shortDesc: 'Los sistemas satélite consumen datos de referencia vía servicios estándar.',
            detailedCriteria: 'Las nuevas aplicaciones consumen catálogos estándar mediante microservicios, impidiendo la creación de listas de valores locales.',
            evidenceExample: 'API corporativa de catálogos que alimenta los dropdowns de todas las aplicaciones de la empresa.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Gestión federada con estándares de industria abiertos',
            shortDesc: 'Adopción de estándares internacionales con actualización automática.',
            detailedCriteria: 'La empresa se conecta a servicios canónicos globales (ej. GS1 para productos, ISO para geografía) manteniendo sus catálogos siempre al día.',
            evidenceExample: 'Catálogo de productos homologado automáticamente con redes globales de comercio electrónico.'
          }
        }
      }
    ]
  },
  {
    id: 'security_privacy',
    name: 'Seguridad, Privacidad y Cumplimiento',
    shortName: 'Seguridad & Privacidad',
    dmbokChapter: 'DAMA-DMBOK2 Cap. 7: Data Security Management',
    iconName: 'Lock',
    description: 'Clasificación de la confidencialidad, controles de acceso por necesidad (RBAC), anonimización y cumplimiento de leyes de privacidad.',
    strategicImportance: 'El incumplimiento de privacidad o las brechas de datos acarrean multas masivas, demandas y pérdida de confianza del cliente.',
    questions: [
      {
        id: 'q_data_classification',
        dimensionId: 'security_privacy',
        title: 'Clasificación de Datos y Control de Acceso (RBAC)',
        businessContext: '¿Los activos de datos están catalogados según su nivel de confidencialidad (Público, Interno, Confidencial, Altamente Restringido) y protegidos acordemente?',
        damaRef: 'DMBOK2 7.2.1: Data Classification & Access Control Policies',
        weight: 1.2,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Acceso irrestricto o descontrolado',
            shortDesc: 'Cualquier empleado puede ver sueldos, tarjetas o datos personales.',
            detailedCriteria: 'No hay etiquetas de confidencialidad; los permisos en bases de datos o carpetas compartidas son masivos y sin filtro de necesidad laboral.',
            evidenceExample: 'Carpetas de red abiertas donde practicantes y directores pueden ver los salarios de toda la compañía.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Permisos asignados a título personal sin roles',
            shortDesc: 'Listas de excepciones individuales administradas caso por caso.',
            detailedCriteria: 'Se otorgan permisos a "pedro.perez" en lugar de al rol "Analista de Riesgo"; cuando alguien cambia de puesto, retiene todos sus accesos anteriores.',
            evidenceExample: 'Empleados con privilegios de administrador acumulados de 4 cargos previos en la empresa.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Esquema de clasificación corporativo y RBAC',
            shortDesc: 'Políticas de clasificación de 4 niveles y perfiles de acceso definidos.',
            detailedCriteria: 'Existe una política formal con niveles (Público, Interno, Confidencial, Secreto); los accesos se gestionan por roles (Role-Based Access Control) con aprobación del Data Owner.',
            evidenceExample: 'Matriz de roles donde para acceder a la base de clientes de alto patrimonio se requiere visto bueno explícito del Gerente de Banca Privada.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Enmascaramiento y auditoría continua de accesos',
            shortDesc: 'Enmascaramiento de datos dinámico y registros inmutables de acceso.',
            detailedCriteria: 'Los datos sensibles (tarjetas, datos médicos, salarios) se enmascaran automáticamente para usuarios no autorizados; se audita quién accedió a qué.',
            evidenceExample: 'Los analistas ven "4509-XXXX-XXXX-1234" en lugar del número completo y cada consulta queda registrada en logs de seguridad.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Seguridad Zero-Trust y gobierno de privacidad automatizado',
            shortDesc: 'Cifrado de extremo a extremo y control de acceso basado en atributos (ABAC).',
            detailedCriteria: 'Políticas de Zero-Trust que evalúan contexto de conexión, dispositivo y sensibilidad del dato en tiempo real para autorizar accesos mínimos.',
            evidenceExample: 'Cifrado cuántico/avanzado con revocación automática de tokens si el dispositivo se conecta fuera de la red segura.'
          }
        }
      },
      {
        id: 'q_privacy_compliance',
        dimensionId: 'security_privacy',
        title: 'Gestión de Privacidad y Derechos del Titular (GDPR / Leyes Locales)',
        businessContext: '¿La empresa cuenta con procesos para gestionar consentimientos, revocaciones y atender solicitudes de acceso, rectificación y eliminación (derecho al olvido)?',
        damaRef: 'DMBOK2 7.2.2: Privacy Regulations & Consent Governance',
        weight: 1.1,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Omisión total de normativas de privacidad',
            shortDesc: 'Se capturan datos personales sin consentimiento ni aviso de privacidad.',
            detailedCriteria: 'La empresa ignora o posterga los requerimientos de la ley de protección de datos; riesgo inminente de multas severas.',
            evidenceExample: 'Se compran bases de datos a terceros y se les envía spam sin haber obtenido autorización legal previa.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Casillas de verificación legales sin proceso operativo',
            shortDesc: 'Términos y condiciones en la web, pero sin capacidad de cumplir peticiones.',
            detailedCriteria: 'Existe un texto de privacidad, pero si un cliente pide borrar sus datos, nadie en la empresa sabe cómo borrarlos de los 15 sistemas donde residen.',
            evidenceExample: 'Un usuario ejerce su derecho al olvido y pasan 6 meses sin que la empresa logre eliminarlo de sus backups y bases.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Flujo formal de atención de derechos ARCO / Privacidad',
            shortDesc: 'Oficial de Privacidad (DPO) y procedimiento documentado para solicitudes.',
            detailedCriteria: 'Se gestiona un registro de actividades de tratamiento de datos personales (ROPA); se responde a solicitudes de titulares dentro de plazos legales.',
            evidenceExample: 'Canal de atención al ciudadano que canaliza solicitudes de rectificación o baja en un plazo máximo de 10 días hábiles.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Gestión automatizada de consentimientos y retención',
            shortDesc: 'Plataforma de gestión de consentimientos (CMP) integrada a sistemas de marketing.',
            detailedCriteria: 'Si un cliente revoca su permiso comercial, la plataforma bloquea automáticamente su inclusión en campañas en todos los canales en tiempo real.',
            evidenceExample: 'Baja inmediata en el CMP que se replica en HubSpot, Salesforce y Meta Ads sin intervención manual.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Privacidad desde el Diseño (Privacy by Design)',
            shortDesc: 'La privacidad es una ventaja competitiva de confianza para el cliente.',
            detailedCriteria: 'Cada nuevo producto digital incorpora evaluaciones de impacto de privacidad (DPIA); uso de técnicas avanzadas como privacidad diferencial y datos sintéticos.',
            evidenceExample: 'Uso de datos sintéticos anonimizados para entrenar modelos analíticos sin exponer ningún dato real de clientes.'
          }
        }
      }
    ]
  },
  {
    id: 'architecture_analytics',
    name: 'Arquitectura, Integración y Analítica / IA',
    shortName: 'Arquitectura & Analítica/IA',
    dmbokChapter: 'DAMA-DMBOK2 Cap. 4, 8 & 11: Architecture, Warehousing & BI',
    iconName: 'Layers',
    description: 'Arquitectura empresarial de datos, modernización a la nube, gobernanza de autoservicio para BI y confiabilidad de modelos de IA.',
    strategicImportance: 'Sin una arquitectura gobernada, las herramientas de BI multiplican versiones discordantes y los modelos de IA aprenden de datos corruptos.',
    questions: [
      {
        id: 'q_data_architecture',
        dimensionId: 'architecture_analytics',
        title: 'Arquitectura Empresarial de Datos e Integración de Silos',
        businessContext: '¿La arquitectura de datos está planificada estratégicamente (Data Lakehouse, Hub de Integración) o es una maraña de conexiones punto a punto desordenadas?',
        damaRef: 'DMBOK2 4.2: Data Architecture & Enterprise Models',
        weight: 1.1,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Arquitectura "Spaghetti" y silos estancos',
            shortDesc: 'Cientos de conexiones punto a punto sin orden ni documentación.',
            detailedCriteria: 'Los datos se extraen de bases operativas con consultas pesadas que ralentizan la operación; si un sistema cambia, se rompen 10 integraciones.',
            evidenceExample: 'Extracciones directas de la base transaccional que cuelgan el sistema de facturación en horas pico.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Data Marts locales sin visión corporativa',
            shortDesc: 'Pequeñas bases analíticas que duplican información y costes.',
            detailedCriteria: 'Cada área montó su base SQL o servidor independiente; proliferan copias desincronizadas de los mismos datos con costos crecientes.',
            evidenceExample: 'Ventas y Finanzas pagan servidores separados para almacenar casi las mismas tablas de transacciones.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Repositorio analítico centralizado y estándares de integración',
            shortDesc: 'Data Warehouse o Data Lakehouse con capas claras de datos.',
            detailedCriteria: 'Existe una arquitectura formal (capas Raw / Staging, Curada / Trusted, Consumo / Marts) con pipelines ETL/ELT estandarizados y monitoreados.',
            evidenceExample: 'Data Lakehouse en la nube con separación entre datos brutos y datos curados con reglas corporativas.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Arquitectura escalable orientada a productos de datos',
            shortDesc: 'Pipelines CI/CD, gobierno de esquemas y observabilidad de datos.',
            detailedCriteria: 'Observabilidad continua del flujo de datos (frescura, volumen, esquemas); las alertas evitan que datos rotos lleguen a los reportes.',
            evidenceExample: 'Pruebas automáticas de integración continua (Great Expectations o dbt tests) en cada pipeline de datos.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Ecosistema moderno distribuido (Mesh / Fabric)',
            shortDesc: 'Autonomía de dominios con gobernanza federada computacional.',
            detailedCriteria: 'Los equipos de dominio exponen sus datos como productos certificados a través de una malla empresarial con alta interoperabilidad semántica.',
            evidenceExample: 'Marketplace interno de Data Products con documentación viva, SLAs de disponibilidad y consumo por APIs.'
          }
        }
      },
      {
        id: 'q_self_service_ai_gov',
        dimensionId: 'architecture_analytics',
        title: 'Gobernanza de Autoservicio (Self-Service) e Inteligencia Artificial',
        businessContext: '¿Los usuarios de negocio pueden explorar datos con autonomía y confianza, y se gobiernan los datos que entrenan o alimentan modelos de IA?',
        damaRef: 'DMBOK2 11.2.3: Self-Service Analytics Governance & AI Data Foundations',
        weight: 1.2,
        rubrics: {
          1: {
            level: 1,
            title: 'Nivel 1: Cuello de botella en TI o anarquía analítica',
            shortDesc: 'O se espera 6 meses por un reporte o cada usuario usa datos sin control.',
            detailedCriteria: 'Los usuarios dependen de programadores para cualquier reporte nuevo, o descargan masivamente datos a hojas de cálculo privadas incontrolables.',
            evidenceExample: 'Fila de espera de 4 meses en TI para agregar una nueva columna a un informe de gestión.'
          },
          2: {
            level: 2,
            title: 'Nivel 2: Autoservicio silvestre sin certificación',
            shortDesc: 'Herramientas modernas (Power BI/Tableau) pero con métricas no verificadas.',
            detailedCriteria: 'Todos los analistas tienen licencias de BI, pero crean sus propias métricas y fórmulas; se multiplican dashboards con cifras contradictorias.',
            evidenceExample: 'Tres dashboards diferentes en la empresa muestran tres cifras distintas para el margen de rentabilidad.'
          },
          3: {
            level: 3,
            title: 'Nivel 3: Autoservicio gobernado con conjuntos de datos certificados',
            shortDesc: 'Espacio de datos certificados (Certified Datasets) para analistas.',
            detailedCriteria: 'TI y los Data Stewards publican modelos semánticos oficiales y certificados; los usuarios de negocio construyen sus reportes sobre bases auditadas.',
            evidenceExample: 'Insignia de "Dataset Certificado por Gobierno" en Power BI que garantiza que los datos son de la fuente oficial.'
          },
          4: {
            level: 4,
            title: 'Nivel 4: Marco de Gobierno de Datos para IA y Modelos Predictivos',
            shortDesc: 'Protocolo de validación de datos para modelos de ML y GenAI.',
            detailedCriteria: 'Se auditan los datos de entrenamiento para prevenir sesgos, asegurar representatividad y garantizar trazabilidad en decisiones tomadas por algoritmos.',
            evidenceExample: 'Auditoría de sesgo algorítmico y trazabilidad de los datos que alimentan el modelo de scoring crediticio de la empresa.'
          },
          5: {
            level: 5,
            title: 'Nivel 5: Habilitación analítica de alta velocidad con IA Responsable',
            shortDesc: 'Democratización responsable y marco ético maduro de IA.',
            detailedCriteria: 'Los colaboradores utilizan agentes de IA y analítica prescriptiva bajo un marco de gobernanza ética transparente, auditable y de alto impacto de valor.',
            evidenceExample: 'Marco de IA Responsable adoptado formalmente con comités de ética algorítmica y monitoreo en tiempo real de alucinaciones y derivas.'
          }
        }
      }
    ]
  }
];
