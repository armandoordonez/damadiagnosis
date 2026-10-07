import { CompanyArchetype } from '../types/dama';

export const COMPANY_ARCHETYPES: CompanyArchetype[] = [
  {
    id: 'archetype_fintech',
    title: 'Fintech & Neobanco en Crecimiento',
    companyName: 'NovaPay Digital Bank',
    industry: 'Servicios Financieros & Banca Digital',
    tagline: 'Foco en Cumplimiento Regulatorio, Prevención de Fraude y Riesgo de Crédito',
    description: 'Neobanco con 1.8M de usuarios con rápido crecimiento que enfrenta escrutinio del regulador bancario, dispersión de datos entre microservicios y necesidad de modelos de scoring crediticio auditables.',
    strategy: {
      studentName: 'Ana María Restrepo (MBA 2026)',
      companyName: 'NovaPay Digital Bank',
      industry: 'Servicios Financieros / Fintech',
      companySize: 'enterprise',
      businessModel: 'B2C',
      strategicVision: 'Consolidarnos como el neobanco líder de la región ofreciendo créditos hiperpersonalizados con aprobación en 30 segundos, manteniendo cero multas regulatorias y una tasa de fraude inferior al 0.05% de las transacciones.',
      primaryDrivers: ['regulatory_compliance', 'risk_security', 'ai_analytics_innovation'],
      mainDataPainPoints: [
        'Reportes al regulador bancario requieren semanas de conciliación manual entre contabilidad y la app.',
        'Los modelos de Machine Learning de riesgo sufren por inconsistencias en la captura de ingresos del cliente.',
        'Falta de un catálogo formal de datos; los nuevos ingenieros desconocen el significado de las tablas de transacciones.',
        'Ausencia de Data Owners formales en las áreas de Riesgos y Cumplimiento.'
      ],
      executiveSponsor: 'Chief Risk Officer (CRO) & Chief Financial Officer (CFO)',
      timeHorizonMonths: 18,
      targetMaturityLevel: 4,
      preferredOperatingModel: 'federated'
    },
    prefilledScores: {
      q_gov_council: 2,
      q_data_stewards: 2,
      q_operating_model: 2,
      q_strategy_alignment: 2,
      q_policies_standards: 3,
      q_data_literacy: 2,
      q_critical_data_elements: 2,
      q_dq_dimensions_rules: 2,
      q_root_cause_remediation: 2,
      q_business_glossary: 2,
      q_data_lineage: 1,
      q_mdm_golden_record: 2,
      q_reference_data: 2,
      q_data_classification: 3,
      q_privacy_compliance: 3,
      q_data_architecture: 3,
      q_self_service_ai_gov: 2
    },
    notesPerQuestion: {
      q_gov_council: 'Hay reuniones de urgencia ante auditorías del regulador, pero no existe un consejo formal con acta periódica.',
      q_data_lineage: 'Caja negra para los reportes regulatorios; toma semanas reconstruir el cálculo de solvencia.',
      q_privacy_compliance: 'El área legal tiene políticas publicadas, pero falta automatización en la revocación de consentimientos de marketing.'
    }
  },
  {
    id: 'archetype_retail',
    title: 'Retail Omnicanal & E-Commerce',
    companyName: 'OmniStore Retail Corp',
    industry: 'Comercio Minorista / Retail & Moda',
    tagline: 'Foco en Visión Cliente 360°, Catálogo Maestro de Productos y Personalización',
    description: 'Cadena de 120 tiendas físicas y portal de comercio electrónico con duplicidad masiva de clientes, inventarios desincronizados y campañas de marketing sin segmentación unificada.',
    strategy: {
      studentName: 'Carlos Eduardo Méndez (MBA 2026)',
      companyName: 'OmniStore Retail Corp',
      industry: 'Retail & Comercio Minorista',
      companySize: 'enterprise',
      businessModel: 'B2C',
      strategicVision: 'Transformar la experiencia de compra en una verdadera omnicanalidad fluida: comprar online y recoger en tienda en 1 hora, con recomendaciones personalizadas que aumenten el ticket promedio en 18%.',
      primaryDrivers: ['customer_360', 'operational_efficiency', 'ai_analytics_innovation'],
      mainDataPainPoints: [
        'El cliente que compra en tienda física no es reconocido cuando entra a la tienda online; existen hasta 4 registros por persona.',
        'Discrepancias críticas en el stock disponible: el e-commerce vende productos que en tienda física ya se agotaron.',
        'Métricas de marketing contradictorias: el área de tiendas reporta una caída de ventas mientras el equipo digital reporta éxito total.',
        'Catálogo de productos desordenado con múltiples códigos SKU para el mismo artículo con proveedores distintos.'
      ],
      executiveSponsor: 'Chief Commercial Officer (CCO) & Chief Marketing Officer (CMO)',
      timeHorizonMonths: 12,
      targetMaturityLevel: 3,
      preferredOperatingModel: 'centralized'
    },
    prefilledScores: {
      q_gov_council: 1,
      q_data_stewards: 1,
      q_operating_model: 1,
      q_strategy_alignment: 2,
      q_policies_standards: 1,
      q_data_literacy: 2,
      q_critical_data_elements: 2,
      q_dq_dimensions_rules: 1,
      q_root_cause_remediation: 1,
      q_business_glossary: 1,
      q_data_lineage: 1,
      q_mdm_golden_record: 1,
      q_reference_data: 2,
      q_data_classification: 2,
      q_privacy_compliance: 2,
      q_data_architecture: 2,
      q_self_service_ai_gov: 2
    },
    notesPerQuestion: {
      q_mdm_golden_record: 'Graves problemas de clientes y productos duplicados entre SAP en tiendas y Shopify en web.',
      q_business_glossary: 'No hay consenso sobre qué es "Venta Neta" (si descuenta devoluciones antes o después de impuestos).'
    }
  },
  {
    id: 'archetype_health',
    title: 'Red Hospitalaria & Salud',
    companyName: 'Grupo Hospitalario San Lucas',
    industry: 'Salud, Clínicas y Servicios Médicos',
    tagline: 'Foco en Privacidad de Datos Sensibles, Historia Clínica y Calidad Asistencial',
    description: 'Red de 8 clínicas y 25 centros ambulatorios con sistemas heterogéneos de historia clínica, estricta regulación de datos de salud y necesidad de garantizar continuidad del paciente.',
    strategy: {
      studentName: 'Dra. Marcela Silva (Magíster en Gestión de Salud / MBA)',
      companyName: 'Grupo Hospitalario San Lucas',
      industry: 'Salud y Servicios Hospitalarios',
      companySize: 'enterprise',
      businessModel: 'B2B2C',
      strategicVision: 'Garantizar una atención clínica segura e integrada con acceso unificado a la historia clínica del paciente en cualquier sede, cumpliendo al 100% las normativas de privacidad médica y reduciendo tiempos de espera en urgencias.',
      primaryDrivers: ['regulatory_compliance', 'risk_security', 'operational_efficiency'],
      mainDataPainPoints: [
        'Historias clínicas fragmentadas entre sedes; los médicos no pueden ver los exámenes practicados en otra clínica de la misma red.',
        'Riesgo crítico de privacidad: datos sensibles de diagnósticos compartidos por correo no seguro o carpetas abiertas.',
        'Disparidad en la codificación de enfermedades (mezcla de CIE-10, textos libres y códigos locales de laboratorio).',
        'Falta de un comité que priorice qué proyectos de datos clínicos deben recibir financiamiento.'
      ],
      executiveSponsor: 'Director Médico Corporativo & Gerente General',
      timeHorizonMonths: 24,
      targetMaturityLevel: 4,
      preferredOperatingModel: 'federated'
    },
    prefilledScores: {
      q_gov_council: 2,
      q_data_stewards: 1,
      q_operating_model: 2,
      q_strategy_alignment: 2,
      q_policies_standards: 3,
      q_data_literacy: 1,
      q_critical_data_elements: 2,
      q_dq_dimensions_rules: 2,
      q_root_cause_remediation: 1,
      q_business_glossary: 2,
      q_data_lineage: 2,
      q_mdm_golden_record: 2,
      q_reference_data: 2,
      q_data_classification: 3,
      q_privacy_compliance: 3,
      q_data_architecture: 2,
      q_self_service_ai_gov: 1
    }
  },
  {
    id: 'archetype_manufacturing',
    title: 'Industria & Manufactura B2B',
    companyName: 'Metales & Componentes Andinos',
    industry: 'Manufactura, Metalmecánica & Construcción',
    tagline: 'Foco en Cadena de Suministro, Maestro de Materiales y Eficiencia Operativa',
    description: 'Empresa manufacturera con 4 plantas industriales y distribución en 6 países. Elevados costos por compras duplicadas de repuestos debido a descripciones no estandarizadas.',
    strategy: {
      studentName: 'Javier Morales (MBA Operaciones & Estrategia)',
      companyName: 'Metales & Componentes Andinos',
      industry: 'Manufactura y Bienes de Capital',
      companySize: 'midmarket',
      businessModel: 'B2B',
      strategicVision: 'Optimizar el capital de trabajo reduciendo el inventario inmovilizado en $4.5M mediante visibilidad en tiempo real de la cadena de suministro y mantenimiento predictivo en plantas.',
      primaryDrivers: ['operational_efficiency', 'cloud_modernization', 'customer_360'],
      mainDataPainPoints: [
        'Mismo repuesto industrial registrado con 5 nombres distintos (ej. "Tornillo 3/8", "Perno 3/8 zincado", "Bolt 3/8"), generando sobrecompras inútiles.',
        'Datos de sensores de planta aislados en sistemas SCADA que no se conectan al ERP corporativo.',
        'Decisiones de compra tomadas en Excel individuales por cada jefe de planta sin consolidación corporativa.',
        'Nula cultura de custodia de datos; los operarios ingresan campos obligatorios con caracteres aleatorios para salir del paso.'
      ],
      executiveSponsor: 'Vicepresidente de Operaciones & Supply Chain',
      timeHorizonMonths: 18,
      targetMaturityLevel: 3,
      preferredOperatingModel: 'centralized'
    },
    prefilledScores: {
      q_gov_council: 1,
      q_data_stewards: 1,
      q_operating_model: 1,
      q_strategy_alignment: 2,
      q_policies_standards: 2,
      q_data_literacy: 1,
      q_critical_data_elements: 2,
      q_dq_dimensions_rules: 1,
      q_root_cause_remediation: 1,
      q_business_glossary: 1,
      q_data_lineage: 1,
      q_mdm_golden_record: 1,
      q_reference_data: 1,
      q_data_classification: 2,
      q_privacy_compliance: 2,
      q_data_architecture: 2,
      q_self_service_ai_gov: 1
    }
  },
  {
    id: 'archetype_saas',
    title: 'SaaS B2B & Escalamiento Tecnológico',
    companyName: 'CloudMetrics Global',
    industry: 'Software como Servicio (SaaS) & Big Data',
    tagline: 'Foco en Retención (Net Revenue Retention), Autoservicio Confiable y GenAI',
    description: 'Empresa tecnológica en fase de Scale-Up con 800 clientes corporativos. Los silos entre Ventas (HubSpot), Éxito del Cliente (Gainsight) y Telemetría de Producto generan discrepancias en el cálculo de Churn.',
    strategy: {
      studentName: 'Valeria Gómez (Master in Business & Tech)',
      companyName: 'CloudMetrics Global',
      industry: 'Software / Tecnología B2B',
      companySize: 'midmarket',
      businessModel: 'B2B',
      strategicVision: 'Alcanzar $50M en ARR con un Net Revenue Retention (NRR) del 125%, habilitando agentes de IA en el producto alimentados por datos gobernados con cero alucinaciones sobre métricas financieras.',
      primaryDrivers: ['ai_analytics_innovation', 'customer_360', 'cloud_modernization'],
      mainDataPainPoints: [
        'Diferencias de criterio entre Finanzas y Customer Success sobre cómo calcular el Churn y el ARR.',
        'Pipelines de datos en la nube sin pruebas automáticas de calidad; reportes rotos después de cada release de producto.',
        'Autoservicio descontrolado: cientos de dashboards en Tableau que nadie mantiene con fórmulas contradictorias.',
        'Necesidad urgente de gobernar los datos que se pasan a APIs de OpenAI para evitar filtraciones de código y datos de clientes.'
      ],
      executiveSponsor: 'Chief Technology Officer (CTO) & Chief Executive Officer (CEO)',
      timeHorizonMonths: 12,
      targetMaturityLevel: 4,
      preferredOperatingModel: 'domain_mesh'
    },
    prefilledScores: {
      q_gov_council: 2,
      q_data_stewards: 2,
      q_operating_model: 2,
      q_strategy_alignment: 3,
      q_policies_standards: 2,
      q_data_literacy: 3,
      q_critical_data_elements: 2,
      q_dq_dimensions_rules: 2,
      q_root_cause_remediation: 2,
      q_business_glossary: 2,
      q_data_lineage: 2,
      q_mdm_golden_record: 2,
      q_reference_data: 2,
      q_data_classification: 2,
      q_privacy_compliance: 3,
      q_data_architecture: 3,
      q_self_service_ai_gov: 3
    }
  }
];
