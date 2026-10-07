export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export interface MaturityRubric {
  level: MaturityLevel;
  title: string;
  shortDesc: string;
  detailedCriteria: string;
  evidenceExample: string;
}

export interface DiagnosticQuestion {
  id: string;
  dimensionId: string;
  title: string;
  businessContext: string;
  damaRef: string; // e.g. "DAMA-DMBOK2 Cap. 3: Data Governance"
  weight: number;
  rubrics: Record<MaturityLevel, MaturityRubric>;
}

export interface DamaDimension {
  id: string;
  name: string;
  shortName: string;
  dmbokChapter: string;
  iconName: string;
  description: string;
  strategicImportance: string;
  questions: DiagnosticQuestion[];
}

export type BusinessDriverId =
  | 'customer_360'
  | 'regulatory_compliance'
  | 'operational_efficiency'
  | 'ai_analytics_innovation'
  | 'cloud_modernization'
  | 'risk_security';

export interface BusinessDriver {
  id: BusinessDriverId;
  name: string;
  tagline: string;
  description: string;
  criticalDimensions: string[]; // Dimension IDs prioritized by this driver
  businessRisksIfFails: string[];
}

export type OperatingModelType =
  | 'centralized'
  | 'federated'
  | 'domain_mesh'
  | 'decentralized';

export interface CompanyStrategyProfile {
  studentName: string;
  companyName: string;
  industry: string;
  companySize: 'startup' | 'sme' | 'midmarket' | 'enterprise';
  businessModel: 'B2B' | 'B2C' | 'B2B2C' | 'Government';
  strategicVision: string;
  primaryDrivers: BusinessDriverId[];
  mainDataPainPoints: string[];
  executiveSponsor: string;
  timeHorizonMonths: number;
  targetMaturityLevel: MaturityLevel;
  preferredOperatingModel: OperatingModelType;
}

export interface DimensionScore {
  dimensionId: string;
  dimensionName: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  answeredCount: number;
  totalQuestions: number;
  criticalForStrategy: boolean;
  status: 'critical' | 'moderate' | 'aligned';
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  governanceArtifacts: string[];
  damaKnowledgeAreas: string[];
  responsibleRole: string;
  riskFactor: 'Bajo' | 'Medio' | 'Alto';
  durationWeeks: number;
}

export interface RoadmapPhase {
  phaseNumber: number;
  name: string;
  timeframe: string;
  objective: string;
  focusTheme: string;
  milestones: RoadmapMilestone[];
  kpisToMeasure: string[];
}

export interface PrioritizationInitiative {
  id: string;
  name: string;
  dimension: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
  effort: 'Alto' | 'Medio' | 'Bajo';
  quadrant: 'quick_wins' | 'strategic_bets' | 'tactical_enhancements' | 'fill_ins';
  description: string;
}

export interface RaciRoleItem {
  activity: string;
  damaDimension: string;
  executiveCouncil: 'A' | 'R' | 'C' | 'I';
  dataOwner: 'A' | 'R' | 'C' | 'I';
  dataSteward: 'A' | 'R' | 'C' | 'I';
  technicalCustodian: 'A' | 'R' | 'C' | 'I';
  dataConsumer: 'A' | 'R' | 'C' | 'I';
}

export interface CompanyArchetype {
  id: string;
  title: string;
  industry: string;
  tagline: string;
  companyName: string;
  description: string;
  strategy: CompanyStrategyProfile;
  prefilledScores: Record<string, MaturityLevel>;
  notesPerQuestion?: Record<string, string>;
}
