import {
  CompanyStrategyProfile,
  DimensionScore,
  MaturityLevel,
  RoadmapPhase,
  PrioritizationInitiative,
  RaciRoleItem
} from '../types/dama';
import { DAMA_DIMENSIONS, BUSINESS_DRIVERS } from '../data/damaQuestions';

export function calculateDimensionScores(
  scores: Record<string, MaturityLevel>,
  strategy: CompanyStrategyProfile
): {
  dimensionScores: DimensionScore[];
  overallCurrentScore: number;
  overallTargetScore: number;
  overallGap: number;
  totalAnswered: number;
  totalQuestions: number;
} {
  let totalScoreWeighted = 0;
  let totalWeight = 0;
  let totalAnsweredCount = 0;
  let totalQuestionsCount = 0;

  // Collect critical dimensions from selected business drivers
  const criticalDimensionSet = new Set<string>();
  strategy.primaryDrivers.forEach((driverId) => {
    const driver = BUSINESS_DRIVERS.find((d) => d.id === driverId);
    if (driver) {
      driver.criticalDimensions.forEach((dimId) => criticalDimensionSet.add(dimId));
    }
  });

  const dimensionScores: DimensionScore[] = DAMA_DIMENSIONS.map((dim) => {
    let dimScoreSum = 0;
    let dimWeightSum = 0;
    let answered = 0;

    dim.questions.forEach((q) => {
      totalQuestionsCount++;
      const val = scores[q.id];
      if (val !== undefined && val !== null) {
        answered++;
        totalAnsweredCount++;
        dimScoreSum += val * q.weight;
        dimWeightSum += q.weight;

        totalScoreWeighted += val * q.weight;
        totalWeight += q.weight;
      } else {
        // Default to level 1 for unrated items
        dimScoreSum += 1 * q.weight;
        dimWeightSum += q.weight;
        totalScoreWeighted += 1 * q.weight;
        totalWeight += q.weight;
      }
    });

    const currentScore = dimWeightSum > 0 ? Number((dimScoreSum / dimWeightSum).toFixed(1)) : 1.0;
    const targetScore = strategy.targetMaturityLevel || 3;
    const gap = Number(Math.max(0, targetScore - currentScore).toFixed(1));
    const isCritical = criticalDimensionSet.has(dim.id);

    let status: 'critical' | 'moderate' | 'aligned' = 'aligned';
    if (isCritical && gap >= 1.2) {
      status = 'critical';
    } else if (gap >= 1.0) {
      status = 'moderate';
    } else {
      status = 'aligned';
    }

    return {
      dimensionId: dim.id,
      dimensionName: dim.name,
      currentScore,
      targetScore,
      gap,
      answeredCount: answered,
      totalQuestions: dim.questions.length,
      criticalForStrategy: isCritical,
      status
    };
  });

  const overallCurrentScore =
    totalWeight > 0 ? Number((totalScoreWeighted / totalWeight).toFixed(1)) : 1.0;
  const overallTargetScore = strategy.targetMaturityLevel || 3;
  const overallGap = Number(Math.max(0, overallTargetScore - overallCurrentScore).toFixed(1));

  return {
    dimensionScores,
    overallCurrentScore,
    overallTargetScore,
    overallGap,
    totalAnswered: totalAnsweredCount,
    totalQuestions: totalQuestionsCount
  };
}

export function getMaturityStageInfo(score: number): {
  level: number;
  name: string;
  badgeClass: string;
  executiveSummary: string;
  damaStage: string;
} {
  if (score < 1.8) {
    return {
      level: 1,
      name: 'Nivel 1: Inicial / Ad-hoc',
      badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
      damaStage: 'Procesos informales, silos no integrados y gestión reactiva ante crisis.',
      executiveSummary:
        'La organización carece de gobernanza formal. Los datos se perciben como un problema exclusivo de TI y existen múltiples verdades en hojas de cálculo paralelas con alta desconfianza en los reportes.'
    };
  } else if (score < 2.7) {
    return {
      level: 2,
      name: 'Nivel 2: Gestionado Localmente / Repetible',
      badgeClass: 'text-blue-800 bg-blue-50 border-blue-200',
      damaStage: 'Iniciativas departamentales aisladas, esfuerzo heroico individual.',
      executiveSummary:
        'Existen esfuerzos tácticos en departamentos clave (ej. Finanzas o Riesgos), pero sin coordinación corporativa. La calidad depende de analistas específicos y no de procesos institucionalizados.'
    };
  } else if (score < 3.6) {
    return {
      level: 3,
      name: 'Nivel 3: Definido / Institucionalizado',
      badgeClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      damaStage: 'Marco formal corporativo, Comité activo, roles de Data Stewards y glosario.',
      executiveSummary:
        'El gobierno de datos cuenta con patrocinio formal, políticas escritas y roles de propiedad identificados. Se comienza a gestionar la calidad y los metadatos de forma sistemática en dominios prioritarios.'
    };
  } else if (score < 4.4) {
    return {
      level: 4,
      name: 'Nivel 4: Cuantitativamente Medido',
      badgeClass: 'text-indigo-800 bg-indigo-50 border-indigo-200',
      damaStage: 'Métricas de calidad automatizadas, SLAs de datos y ROI medible.',
      executiveSummary:
        'La salud del dato se monitorea con KPIs continuos. Los acuerdos de nivel de servicio (SLAs) se cumplen y las inversiones en datos están alineadas y auditadas contra el valor de negocio generado.'
    };
  } else {
    return {
      level: 5,
      name: 'Nivel 5: Optimizado / Gobernanza Adaptativa',
      badgeClass: 'text-purple-800 bg-purple-50 border-purple-200',
      damaStage: 'Cultura data-driven arraigada, mejora continua automatizada y gobierno de IA.',
      executiveSummary:
        'El gobierno está embebido en los ciclos de desarrollo de productos digitales y modelos de IA. La organización compite con ventaja analítica y fomenta la innovación responsable en tiempo real.'
    };
  }
}

export function generateStrategicInsights(
  dimensionScores: DimensionScore[],
  strategy: CompanyStrategyProfile
): {
  bottlenecks: {
    dimension: string;
    gap: number;
    severity: 'Alta' | 'Media';
    analysis: string;
    impactOnVision: string;
  }[];
  strategicAlignmentAlert: string;
  operatingModelAdvice: string;
} {
  const bottlenecks = dimensionScores
    .filter((d) => d.status === 'critical' || d.gap >= 1.5)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 4)
    .map((d) => {
      let impactOnVision = '';
      if (d.dimensionId === 'master_data') {
        impactOnVision =
          'Imposibilita la visión unificada de entidades maestras; genera registros duplicados que desorientan las decisiones comerciales y operativas.';
      } else if (d.dimensionId === 'data_quality') {
        impactOnVision =
          'Contamina los paneles de control e iniciativas de IA con datos sesgados o incompletos, destruyendo la credibilidad en los números.';
      } else if (d.dimensionId === 'gov_framework') {
        impactOnVision =
          'Sin patrocinio formal ni Data Owners claros, las iniciativas de datos quedan desatendidas ante la primera presión de la operación diaria.';
      } else if (d.dimensionId === 'security_privacy') {
        impactOnVision =
          'Expone a la compañía a contingencias legales, multas regulatorias y fugas de información sensible de clientes o estrategia.';
      } else if (d.dimensionId === 'metadata_catalog') {
        impactOnVision =
          'Mantiene silos de vocabulario donde cada departamento mide indicadores con fórmulas contradictorias.';
      } else {
        impactOnVision =
          'Limita la escalabilidad técnica y produce sobrecostos en mantenimiento de arquitecturas dispersas.';
      }

      return {
        dimension: d.dimensionName,
        gap: d.gap,
        severity: (d.criticalForStrategy ? 'Alta' : 'Media') as 'Alta' | 'Media',
        analysis: `La brecha de ${d.gap} puntos en ${d.dimensionName} (Actual: ${d.currentScore} vs Objetivo: ${d.targetScore}) representa un freno directo para los objetivos de ${strategy.companyName || 'la empresa'}.`,
        impactOnVision
      };
    });

  const driverNames = strategy.primaryDrivers
    .map((dId) => BUSINESS_DRIVERS.find((b) => b.id === dId)?.name)
    .filter(Boolean)
    .join(', ');

  const strategicAlignmentAlert =
    strategy.primaryDrivers.length > 0
      ? `Para respaldar la visión orientada a [${driverNames}], el programa de gobierno NO debe intentar abarcar todas las tablas a la vez. Debe priorizar exclusivamente el Dominio Piloto que desbloquea este valor en los primeros 6 meses.`
      : 'Es indispensable vincular el diagnóstico a al menos un objetivo estratégico concreto de negocio para evitar que el gobierno sea percibido como burocracia de TI.';

  let operatingModelAdvice = '';
  switch (strategy.preferredOperatingModel) {
    case 'centralized':
      operatingModelAdvice =
        'Modelo Centralizado recomendado: Adecuado para arrancar con fuerza en empresas con bajo nivel de madurez o sectores altamente regulados, concentrando políticas y catálogos en una Oficina de Gobierno (DGO) antes de descentralizar.';
      break;
    case 'federated':
      operatingModelAdvice =
        'Modelo Federado recomendado (Hub & Spoke): Equilibrio óptimo para medianas y grandes empresas. El DGO define estándares y gobernanza corporativa, mientras los Data Stewards de las unidades de negocio ejecutan y responden en el día a día.';
      break;
    case 'domain_mesh':
      operatingModelAdvice =
        'Modelo Data Mesh / Orientado a Dominios: Recomendado para organizaciones con alta madurez tecnológica y productos digitales independientes. Requiere que cada equipo de producto asuma la propiedad de sus datos como un activo auditable.';
      break;
    default:
      operatingModelAdvice =
        'Modelo Híbrido evolutivo: Se recomienda iniciar con un modelo centralizado en el primer año y evolucionar hacia un modelo federado conforme los Stewards ganen autonomía.';
  }

  return {
    bottlenecks,
    strategicAlignmentAlert,
    operatingModelAdvice
  };
}

export function generateCustomRoadmap(
  scores: Record<string, MaturityLevel>,
  strategy: CompanyStrategyProfile,
  dimensionScores: DimensionScore[]
): RoadmapPhase[] {
  const company = strategy.companyName || 'La Organización';
  const sponsor = strategy.executiveSponsor || 'Dirección General';
  const targetLevel = strategy.targetMaturityLevel || 3;

  // Find lowest dimensions to adapt milestones
  const lowestDimensions = [...dimensionScores].sort((a, b) => a.currentScore - b.currentScore);
  const lowestDim = lowestDimensions[0]?.dimensionName || 'Calidad de Datos';

  return [
    {
      phaseNumber: 1,
      name: 'Fase 1: Quick Wins y Fundamentos de Gobierno',
      timeframe: 'Meses 1 - 3',
      objective: `Establecer el mandato ejecutivo de ${company}, conformar los órganos de decisión y capturar victorias tempranas en el dominio crítico.`,
      focusTheme: 'Fundación & Alineación Ejecutiva',
      kpisToMeasure: [
        'Acta de constitución del Comité de Gobierno aprobada',
        '100% de los primeros 15-25 Elementos Críticos de Datos (CDEs) mapeados',
        'Primer caso de negocio aprobado por ' + sponsor
      ],
      milestones: [
        {
          id: 'm1_charter',
          title: 'Carta de Gobierno de Datos (Data Governance Charter) y Patrocinio',
          description:
            `Redactar y suscribir el documento fundacional con el respaldo explícito de ${sponsor}. Establecer la misión, alcance inicial, autoridad y modelo operativo.`,
          deliverables: [
            'Data Governance Charter formal firmado',
            'Matriz de Stakeholders ejecutivos y mapa de influencias',
            'Definición del caso de uso piloto (Quick Win de alto impacto)'
          ],
          governanceArtifacts: ['Charter de Gobierno', 'Business Case Ejecutivo'],
          damaKnowledgeAreas: ['Gobierno de Datos', 'Estrategia de Datos'],
          responsibleRole: 'Sponsor Ejecutivo & Líder de Gobierno',
          riskFactor: 'Alto',
          durationWeeks: 4
        },
        {
          id: 'm1_council_setup',
          title: 'Conformación del Comité de Gobierno y Designación de Data Owners',
          description:
            'Estructurar el Data Governance Council con líderes de negocio (Comercial, Finanzas, Operaciones) y nombrar a los primeros Data Owners para el dominio piloto.',
          deliverables: [
            'Reglamento y calendario formal de sesiones del Comité (reunión mensual)',
            'Nombramiento oficial de 3-5 Data Owners de negocio',
            'Matriz RACI base para el dominio piloto'
          ],
          governanceArtifacts: ['Reglamento del Comité', 'Matriz RACI Inicial'],
          damaKnowledgeAreas: ['Gobierno de Datos', 'Organización'],
          responsibleRole: 'Data Governance Lead',
          riskFactor: 'Medio',
          durationWeeks: 4
        },
        {
          id: 'm1_cde_inventory',
          title: 'Inventario de Elementos Críticos de Datos (CDEs) del Piloto',
          description:
            `Identificar y priorizar los 20 datos vitales vinculados a los factores estratégicos de ${company} (ej. Identificador de cliente, código de producto, saldo).`,
          deliverables: [
            'Inventario oficial de CDEs con impacto de negocio cuantificado',
            'Mapeo de sistemas origen y dueños asignados para cada CDE',
            'Primer análisis de causas de dolor actuales'
          ],
          governanceArtifacts: ['Ficha de CDEs', 'Registro de Dolores de Datos'],
          damaKnowledgeAreas: ['Calidad de Datos', 'Metadatos'],
          responsibleRole: 'Data Stewards de Negocio & TI',
          riskFactor: 'Medio',
          durationWeeks: 4
        }
      ]
    },
    {
      phaseNumber: 2,
      name: 'Fase 2: Caso de Uso Piloto y Reglas de Calidad',
      timeframe: 'Meses 4 - 7',
      objective:
        'Demostrar valor tangible en el negocio mediante la implementación de reglas de calidad y glosario en el dominio de mayor dolor.',
      focusTheme: 'Ejecución Piloto & Calidad Demostrable',
      kpisToMeasure: [
        'Reducción > 30% en incidencias de datos en el dominio piloto',
        'Glosario de negocio del piloto publicado con 50+ términos consensuados',
        'Primer Scorecard de Calidad de Datos presentado en el Comité'
      ],
      milestones: [
        {
          id: 'm2_glossary_launch',
          title: 'Glosario de Términos de Negocio del Dominio Piloto',
          description:
            'Consensuar y publicar las definiciones oficiales de los términos que generaban disputas departamentales (ej. qué es una venta válida o un cliente activo).',
          deliverables: [
            'Glosario de Negocio accesible con fórmulas y dueños de negocio',
            'Diccionario técnico de datos asociado a las tablas fuente',
            'Flujo formal para aprobar o actualizar nuevas definiciones'
          ],
          governanceArtifacts: ['Portal de Glosario', 'Workflow de Aprobación de Términos'],
          damaKnowledgeAreas: ['Metadatos & Catálogo'],
          responsibleRole: 'Business Data Stewards',
          riskFactor: 'Medio',
          durationWeeks: 6
        },
        {
          id: 'm2_dq_rules_dashboard',
          title: 'Tablero de Calidad de Datos (Data Quality Scorecard)',
          description:
            'Implementar reglas automáticas de validación sobre las dimensiones DAMA (completitud, validez, unicidad) y publicar el primer panel de salud del dato.',
          deliverables: [
            'Catálogo de 15-25 reglas de calidad documentadas',
            'Dashboard interactivo de calidad de datos para el dominio piloto',
            'Flujo de gestión y remediación de anomalías en causa raíz'
          ],
          governanceArtifacts: ['Reglas de Calidad DQ', 'Dashboard de Salud del Dato'],
          damaKnowledgeAreas: ['Calidad de Datos'],
          responsibleRole: 'Data Quality Specialist & Data Stewards',
          riskFactor: 'Medio',
          durationWeeks: 6
        },
        {
          id: 'm2_policy_framework',
          title: 'Marco de Políticas Fundamentales y Clasificación de Seguridad',
          description:
            'Promulgar la Política General de Gobierno de Datos y el esquema de clasificación de seguridad (Público, Interno, Confidencial, Restringido).',
          deliverables: [
            'Política Corporativa de Gobierno y Calidad de Datos aprobada',
            'Política de Clasificación y Control de Acceso por Roles',
            'Guía rápida de buenas prácticas para usuarios finales'
          ],
          governanceArtifacts: ['Política General de Datos', 'Tabla de Clasificación'],
          damaKnowledgeAreas: ['Seguridad & Privacidad', 'Estrategia & Políticas'],
          responsibleRole: 'Comité de Gobierno & Oficial de Cumplimiento',
          riskFactor: 'Bajo',
          durationWeeks: 4
        }
      ]
    },
    {
      phaseNumber: 3,
      name: 'Fase 3: Escalamiento, Catálogo Empresarial y Datos Maestros',
      timeframe: 'Meses 8 - 14',
      objective:
        'Expandir el modelo de gobierno a 3 dominios adicionales, automatizar el linaje de datos y consolidar los datos maestros corporativos.',
      focusTheme: 'Escalamiento & Automatización de Activos',
      kpisToMeasure: [
        '80% de los reportes estratégicos y regulatorios con linaje certificado',
        'Tasa de deduplicación de datos maestros de clientes/productos > 90%',
        'Adopción del catálogo empresarial por más de 100 usuarios activos'
      ],
      milestones: [
        {
          id: 'm3_catalog_lineage',
          title: 'Implementación del Catálogo de Datos Empresarial y Linaje Automático',
          description:
            'Desplegar la herramienta de catálogo institucional que mapee esquemas, linaje de datos de extremo a extremo y metadatos operativos.',
          deliverables: [
            'Catálogo corporativo desplegado e integrado a las fuentes principales',
            'Grafos de linaje para todos los reportes que llegan al Directorio',
            'Capacitación a analistas de negocio en descubrimiento de datos'
          ],
          governanceArtifacts: ['Catálogo Empresarial Activo', 'Mapas de Linaje E2E'],
          damaKnowledgeAreas: ['Metadatos & Catálogo', 'Arquitectura'],
          responsibleRole: 'Arquitecto de Datos & DGO',
          riskFactor: 'Medio',
          durationWeeks: 10
        },
        {
          id: 'm3_mdm_harmonization',
          title: 'Gestión de Datos Maestros (MDM) y Golden Record',
          description:
            'Establecer el sistema maestro canónico para la entidad más crítica (Clientes, Productos o Proveedores), con reglas de conciliación y deduplicación.',
          deliverables: [
            'Reglas de coincidencia (Fuzzy Matching) y fusión de registros',
            'Identificador único corporativo (Golden Record) propagado',
            'Proceso operativo de resolución manual de conflictos por Stewards'
          ],
          governanceArtifacts: ['Matriz de Identidad Canónica', 'Manual de Excepciones MDM'],
          damaKnowledgeAreas: ['Datos Maestros & Referencia'],
          responsibleRole: 'MDM Lead & Data Stewards',
          riskFactor: 'Alto',
          durationWeeks: 12
        },
        {
          id: 'm3_data_literacy_program',
          title: 'Programa Corporativo de Alfabetización de Datos (Data Literacy)',
          description:
            'Lanzar la academia interna de datos con módulos obligatorios para mandos medios y directivos sobre pensamiento analítico, sesgos y ética.',
          deliverables: [
            'Plan formativo por niveles (Básico, Analista, Data Steward, Directivo)',
            'Certificación interna de competencias de datos',
            'Comunidades de práctica de datos activas'
          ],
          governanceArtifacts: ['Plan de Data Literacy', 'Material Formativo'],
          damaKnowledgeAreas: ['Estrategia & Cultura'],
          responsibleRole: 'Recursos Humanos & Líder de Gobierno',
          riskFactor: 'Bajo',
          durationWeeks: 8
        }
      ]
    },
    {
      phaseNumber: 4,
      name: 'Fase 4: Institucionalización, Autoservicio y Gobierno de IA',
      timeframe: 'Meses 15 - 24',
      objective: `Consolidar el nivel ${targetLevel} de madurez DAMA, certificar productos de datos autoservicio y gobernar modelos de Inteligencia Artificial.`,
      focusTheme: 'Gobernanza Adaptativa & Habilitación de IA',
      kpisToMeasure: [
        'Nivel de Madurez DAMA auditado alcanzando el objetivo proyectado',
        '100% de los modelos de IA/Machine Learning en producción con datos auditados',
        'Cálculo de Retorno de Inversión (ROI) del programa de gobierno presentado al Directorio'
      ],
      milestones: [
        {
          id: 'm4_certified_datasets',
          title: 'Autoservicio Analítico Gobernado y Certificación de Datasets',
          description:
            'Habilitar espacios donde los usuarios de negocio generen sus propios análisis sobre conjuntos de datos formalmente certificados, eliminando reportes paralelos.',
          deliverables: [
            'Catálogo de Datasets Certificados para herramientas de BI',
            'Política de caducidad y mantenimiento de reportes analíticos',
            'Auditoría continua de duplicidad analítica'
          ],
          governanceArtifacts: ['Protocolo de Certificación de Datos', 'Guía de BI'],
          damaKnowledgeAreas: ['Arquitectura & BI', 'Calidad'],
          responsibleRole: 'Líder de Analítica & Data Stewards',
          riskFactor: 'Bajo',
          durationWeeks: 8
        },
        {
          id: 'm4_ai_governance',
          title: 'Marco de Gobierno de Datos para Inteligencia Artificial y Ética',
          description:
            'Establecer protocolos para auditar la representatividad, sesgo, privacidad y frescura de los datos que alimentan modelos predictivos e IA generativa.',
          deliverables: [
            'Directrices de IA Responsable y evaluación de riesgos de datos',
            'Fichas técnicas de datos de entrenamiento (Data Cards)',
            'Monitoreo de deriva de datos (Data Drift) en modelos operativos'
          ],
          governanceArtifacts: ['Código de Ética de IA', 'Data Cards de Modelos'],
          damaKnowledgeAreas: ['Estrategia & Cultura', 'Seguridad & Privacidad'],
          responsibleRole: 'Comité de Ética de IA & CDO',
          riskFactor: 'Medio',
          durationWeeks: 8
        },
        {
          id: 'm4_audit_and_roi',
          title: 'Auditoría de Madurez DAMA y Presentación de Valor Financiero',
          description:
            'Ejecutar la segunda evaluación formal de madurez para contrastar el avance frente al diagnóstico inicial y documentar el impacto económico en resultados.',
          deliverables: [
            'Informe de Auditoría de Madurez DMBOK post-implementación',
            'Reporte de Valor Económico Generado (Ahorros, Ingresos, Riesgos evitados)',
            'Plan de Evolución Continua a 3 años'
          ],
          governanceArtifacts: ['Auditoría de Madurez DAMA', 'Informe de ROI para el Board'],
          damaKnowledgeAreas: ['Gobierno de Datos', 'Estrategia'],
          responsibleRole: 'Comité de Gobierno & Auditoría Interna',
          riskFactor: 'Bajo',
          durationWeeks: 4
        }
      ]
    }
  ];
}

export function generatePrioritizationMatrix(
  dimensionScores: DimensionScore[],
  strategy: CompanyStrategyProfile
): PrioritizationInitiative[] {
  return [
    {
      id: 'p1',
      name: 'Acta de Gobierno & Aprobación del Comité de Datos',
      dimension: 'Gobierno & Roles',
      impact: 'Alto',
      effort: 'Bajo',
      quadrant: 'quick_wins',
      description: 'Formalizar el patrocinio del C-Level mediante documento breve que autoriza el inicio del programa.'
    },
    {
      id: 'p2',
      name: 'Identificación de los 20 CDEs del Proceso Crítico',
      dimension: 'Calidad de Datos',
      impact: 'Alto',
      effort: 'Bajo',
      quadrant: 'quick_wins',
      description: 'Focalizar el esfuerzo de calidad en los 20 campos que más impacto tienen en la facturación o la regulación.'
    },
    {
      id: 'p3',
      name: 'Glosario de Negocio de Términos Disputados',
      dimension: 'Metadatos & Catálogo',
      impact: 'Alto',
      effort: 'Medio',
      quadrant: 'quick_wins',
      description: 'Unificar las 10 métricas de ventas y rentabilidad más conflictivas entre Finanzas y Comercial.'
    },
    {
      id: 'p4',
      name: 'Hub de Datos Maestros (MDM) de Clientes / Golden Record',
      dimension: 'Datos Maestros (MDM)',
      impact: 'Alto',
      effort: 'Alto',
      quadrant: 'strategic_bets',
      description: 'Plataforma automatizada para deduplicar y consolidar la visión única del cliente en todos los canales.'
    },
    {
      id: 'p5',
      name: 'Catálogo de Datos Empresarial con Linaje de Extremo a Extremo',
      dimension: 'Metadatos & Catálogo',
      impact: 'Alto',
      effort: 'Alto',
      quadrant: 'strategic_bets',
      description: 'Despliegue de herramienta para escanear y visualizar el flujo de datos desde el origen operacional al reporte.'
    },
    {
      id: 'p6',
      name: 'Tablero Semanal de Salud y Reglas de Calidad',
      dimension: 'Calidad de Datos',
      impact: 'Medio',
      effort: 'Bajo',
      quadrant: 'tactical_enhancements',
      description: 'Automatizar alertas cuando la completitud o validez de los CDEs caiga por debajo del 95%.'
    },
    {
      id: 'p7',
      name: 'Matriz de Clasificación de Seguridad y Control RBAC',
      dimension: 'Seguridad & Privacidad',
      impact: 'Medio',
      effort: 'Medio',
      quadrant: 'tactical_enhancements',
      description: 'Clasificar bases en 4 niveles de confidencialidad y depurar accesos obsoletos.'
    },
    {
      id: 'p8',
      name: 'Limpieza puntual de tablas históricas no prioritarias',
      dimension: 'Calidad de Datos',
      impact: 'Bajo',
      effort: 'Alto',
      quadrant: 'fill_ins',
      description: 'Evitar gastar recursos en depurar tablas archivadas de más de 5 años que no se utilizan en decisiones activas.'
    }
  ];
}

export function generateRaciMatrix(): RaciRoleItem[] {
  return [
    {
      activity: 'Definir y aprobar la Estrategia y Políticas Generales de Datos',
      damaDimension: 'Gobierno & Estrategia',
      executiveCouncil: 'A',
      dataOwner: 'C',
      dataSteward: 'C',
      technicalCustodian: 'I',
      dataConsumer: 'I'
    },
    {
      activity: 'Priorizar y autorizar Elementos Críticos de Datos (CDEs)',
      damaDimension: 'Calidad de Datos',
      executiveCouncil: 'I',
      dataOwner: 'A',
      dataSteward: 'R',
      technicalCustodian: 'C',
      dataConsumer: 'C'
    },
    {
      activity: 'Definir el significado oficial de términos en el Glosario de Negocio',
      damaDimension: 'Metadatos & Catálogo',
      executiveCouncil: 'I',
      dataOwner: 'A',
      dataSteward: 'R',
      technicalCustodian: 'C',
      dataConsumer: 'I'
    },
    {
      activity: 'Establecer y validar reglas de calidad de datos por dominio',
      damaDimension: 'Calidad de Datos',
      executiveCouncil: 'I',
      dataOwner: 'A',
      dataSteward: 'R',
      technicalCustodian: 'C',
      dataConsumer: 'C'
    },
    {
      activity: 'Analizar causa raíz y coordinar remediación de defectos de datos',
      damaDimension: 'Calidad de Datos',
      executiveCouncil: 'I',
      dataOwner: 'A',
      dataSteward: 'R',
      technicalCustodian: 'R',
      dataConsumer: 'I'
    },
    {
      activity: 'Aprobar reglas de coincidencia y Golden Record en Datos Maestros',
      damaDimension: 'Datos Maestros (MDM)',
      executiveCouncil: 'I',
      dataOwner: 'A',
      dataSteward: 'R',
      technicalCustodian: 'C',
      dataConsumer: 'I'
    },
    {
      activity: 'Implementar controles técnicos de seguridad, cifrado y enmascaramiento',
      damaDimension: 'Seguridad & Privacidad',
      executiveCouncil: 'I',
      dataOwner: 'C',
      dataSteward: 'I',
      technicalCustodian: 'A',
      dataConsumer: 'I'
    },
    {
      activity: 'Certificar modelos analíticos y conjuntos de datos para autoservicio',
      damaDimension: 'Arquitectura & BI',
      executiveCouncil: 'I',
      dataOwner: 'A',
      dataSteward: 'R',
      technicalCustodian: 'C',
      dataConsumer: 'C'
    }
  ];
}

export function generateExecutivePitch(
  strategy: CompanyStrategyProfile,
  dimensionScores: DimensionScore[],
  overallScore: number,
  targetScore: number
): {
  headline: string;
  contextAndProblem: string;
  costOfInaction: string;
  proposedSolution: string;
  expectedRoi: string;
  callToAction: string;
} {
  const company = strategy.companyName || 'Nuestra Organización';
  const sponsor = strategy.executiveSponsor || 'El Comité de Dirección';
  const driversList = strategy.primaryDrivers
    .map((d) => BUSINESS_DRIVERS.find((b) => b.id === d)?.name)
    .filter(Boolean)
    .join(' y ');

  const lowestDims = [...dimensionScores].sort((a, b) => a.currentScore - b.currentScore).slice(0, 2);
  const lowestNames = lowestDims.map((d) => `${d.dimensionName} (${d.currentScore}/5)`).join(' y ');

  return {
    headline: `Propuesta de Transformación en Gobierno de Datos para ${company}: Desbloqueando la Estrategia a través de Activos Confiables`,
    contextAndProblem: `${company} ha establecido la ambiciosa visión de [${strategy.strategicVision || 'crecimiento e innovación sostenible'}]. Sin embargo, el diagnóstico de madurez DAMA-DMBOK revela que operamos en un Nivel ${overallScore} de 5.0 (Inicial/Silos), con debilidades críticas en ${lowestNames}. Esto genera duplicidades, fricción entre áreas y desconfianza en los reportes ejecutivos.`,
    costOfInaction: `El costo de no gobernar nuestros datos no es técnico, sino financiero y reputacional. Continuar operando con silos manuales y datos no certificados pone en riesgo directo nuestros objetivos estratégicos de [${driversList || 'eficiencia y satisfacción'}]. Si no actuamos ahora, las discrepancias en reportes continuarán consumiendo cientos de horas hombre cada mes y cualquier inversión en IA o analítica avanzada carecerá de bases sólidas.`,
    proposedSolution: `Proponemos una Hoja de Ruta de Gobierno de Datos orientada a Casos de Negocio en 4 fases, iniciando con un piloto de 3 meses enfocado exclusivamente en los Elementos Críticos de Datos (CDEs) de mayor impacto. No buscaremos gobernar todas las tablas de inmediato, sino garantizar que los datos que respaldan las decisiones del negocio sean auditables, limpios y consensuados.`,
    expectedRoi: `Con la meta de alcanzar un Nivel ${targetScore} de madurez en ${strategy.timeHorizonMonths || 12} meses, proyectamos reducir en más de un 40% las discrepancias en reportes directivos, acelerar en un 50% el time-to-market de nuevos análisis de clientes y blindar a la empresa ante riesgos regulatorios de privacidad.`,
    callToAction: `Solicitamos a ${sponsor} la aprobación formal del Data Governance Charter y la designación de los primeros Data Owners de negocio para dar inicio a la Fase 1 en los próximos 15 días.`
  };
}
