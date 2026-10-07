import React from 'react';
import { CompanyStrategyProfile, DimensionScore, MaturityLevel, RoadmapPhase } from '../types/dama';
import {
  getMaturityStageInfo,
  generateStrategicInsights,
  generateCustomRoadmap,
  generateRaciMatrix,
  generateExecutivePitch
} from '../utils/damaEngine';
import { BUSINESS_DRIVERS } from '../data/damaQuestions';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: CompanyStrategyProfile;
  scores: Record<string, MaturityLevel>;
  notes: Record<string, string>;
  dimensionScores: DimensionScore[];
  overallCurrent: number;
  overallTarget: number;
  overallGap: number;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen,
  onClose,
  strategy,
  scores,
  notes,
  dimensionScores,
  overallCurrent,
  overallTarget,
  overallGap
}) => {
  if (!isOpen) return null;

  const maturityInfo = getMaturityStageInfo(overallCurrent);
  const insights = generateStrategicInsights(dimensionScores, strategy);
  const roadmapPhases: RoadmapPhase[] = generateCustomRoadmap(scores, strategy, dimensionScores);
  const raciMatrix = generateRaciMatrix();
  const executivePitch = generateExecutivePitch(strategy, dimensionScores, overallCurrent, overallTarget);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto border border-slate-200 print:border-none print:shadow-none print:max-h-none print:w-full print:rounded-none">
        {/* Sticky Actions bar for on-screen modal */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs border-b border-slate-200 p-4 flex items-center justify-between z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Dossier Ejecutivo de Gobierno de Datos</span>
            <span className="text-xs text-slate-500 font-mono">DAMA-DMBOK 2</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>Imprimir / Guardar en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Report Document Content */}
        <div className="p-8 sm:p-12 space-y-8 text-slate-900 text-sm print:p-6 print:space-y-6">
          {/* Header Banner */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-indigo-700 uppercase block mb-1">
                MAESTRÍA EN NEGOCIOS · GOBIERNO DE DATOS EMPRESARIAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Diagnóstico de Madurez DAMA & Hoja de Ruta Estratégica
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Evaluación integral de capacidades de gestión de datos según el marco DAMA-DMBOK 2
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 space-y-0.5 shrink-0 font-mono">
              <div><strong>Estudiante:</strong> {strategy.studentName || 'Estudiante MBA'}</div>
              <div><strong>Empresa:</strong> {strategy.companyName || 'Organización'}</div>
              <div><strong>Sector:</strong> {strategy.industry || 'No especificado'}</div>
              <div><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              1. Resumen Ejecutivo y Diagnóstico Global
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Madurez Actual</span>
                <span className="text-3xl font-black text-slate-900 font-mono">{overallCurrent.toFixed(1)} / 5.0</span>
                <div className="text-xs font-bold text-indigo-700 mt-1">{maturityInfo.name}</div>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Visión Objetivo</span>
                <span className="text-3xl font-black text-indigo-600 font-mono">{overallTarget.toFixed(1)} / 5.0</span>
                <div className="text-xs text-slate-600 mt-1">Horizonte a {strategy.timeHorizonMonths} meses</div>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Brecha Global (Gap)</span>
                <span className="text-3xl font-black text-amber-600 font-mono">+{overallGap.toFixed(1)}</span>
                <div className="text-xs text-slate-600 mt-1">Puntos requeridos para alineación</div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-700">
              {maturityInfo.executiveSummary} {insights.operatingModelAdvice}
            </p>
          </div>

          {/* Section 2: Strategy Alignment */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              2. Alineación Estratégica & Factores de Negocio (Business Drivers)
            </h2>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
              <div>
                <strong className="text-slate-900 block mb-0.5">Visión Estratégica Declarada:</strong>
                <p className="text-slate-700 italic">"{strategy.strategicVision || 'Sin visión especificada'}"</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <strong className="text-slate-900 block mb-1">Propulsores de Negocio Prioritarios:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {strategy.primaryDrivers.map((dId) => {
                      const driver = BUSINESS_DRIVERS.find((b) => b.id === dId);
                      return (
                        <li key={dId}>
                          <span className="font-semibold">{driver?.name}:</span> {driver?.tagline}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <strong className="text-slate-900 block mb-1">Gobernanza y Patrocinio:</strong>
                  <div className="space-y-1 text-slate-700">
                    <div><strong>Sponsor Ejecutivo:</strong> {strategy.executiveSponsor || 'Dirección'}</div>
                    <div><strong>Modelo Operativo:</strong> {strategy.preferredOperatingModel.toUpperCase()}</div>
                    <div><strong>Tamaño & Modelo:</strong> {strategy.companySize} · {strategy.businessModel}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Dimension Breakdown Table */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              3. Resultados del Diagnóstico por Dimensión DAMA-DMBOK
            </h2>

            <table className="w-full text-left text-xs border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="p-2.5 font-bold">Dimensión DAMA</th>
                  <th className="p-2.5 font-bold text-right">Actual</th>
                  <th className="p-2.5 font-bold text-right">Objetivo</th>
                  <th className="p-2.5 font-bold text-right">Brecha</th>
                  <th className="p-2.5 font-bold text-center">Crítica Estratégica</th>
                  <th className="p-2.5 font-bold text-right">Nivel de Riesgo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {dimensionScores.map((dim) => (
                  <tr key={dim.dimensionId} className="even:bg-slate-50/50">
                    <td className="p-2.5 font-medium text-slate-900">{dim.dimensionName}</td>
                    <td className="p-2.5 text-right font-mono">{dim.currentScore.toFixed(1)}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-indigo-700">{dim.targetScore}</td>
                    <td className="p-2.5 text-right font-mono font-bold text-amber-700">+{dim.gap.toFixed(1)}</td>
                    <td className="p-2.5 text-center">
                      {dim.criticalForStrategy ? 'Sí (Prioritaria)' : 'Soporte'}
                    </td>
                    <td className="p-2.5 text-right font-semibold">
                      {dim.status === 'critical' ? 'Alto' : dim.status === 'moderate' ? 'Medio' : 'Bajo'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Bottlenecks & Strategic Risks */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              4. Cuellos de Botella Críticos y Riesgos de Inacción
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.bottlenecks.map((b, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{b.dimension}</span>
                    <span className="text-red-600 font-mono">Brecha +{b.gap.toFixed(1)}</span>
                  </div>
                  <p className="text-slate-700">{b.analysis}</p>
                  <p className="text-slate-600 italic"><strong>Impacto directo:</strong> {b.impactOnVision}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Roadmap */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              5. Hoja de Ruta Ejecutiva en 4 Fases (Roadmap)
            </h2>

            <div className="space-y-4">
              {roadmapPhases.map((phase) => (
                <div key={phase.phaseNumber} className="border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-900 text-sm">{phase.name}</h3>
                    <span className="font-mono text-indigo-700 font-bold">{phase.timeframe}</span>
                  </div>
                  <p className="text-slate-700"><strong>Objetivo:</strong> {phase.objective}</p>
                  
                  <div className="pt-2">
                    <strong className="block text-slate-800 mb-1">Entregables Clave:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {phase.milestones.map((m) => (
                        <div key={m.id} className="p-2 bg-slate-50 rounded border border-slate-200 text-[11px]">
                          <span className="font-semibold text-slate-900 block mb-0.5">{m.title}</span>
                          <span className="text-slate-500 block mb-1">Resp: {m.responsibleRole}</span>
                          <span className="text-indigo-700 font-mono text-[10px]">{m.deliverables[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: RACI Matrix */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              6. Matriz RACI de Roles de Gobierno
            </h2>

            <table className="w-full text-left text-[11px] border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="p-2 font-bold">Actividad</th>
                  <th className="p-2 text-center font-bold">Comité Ejecutivo</th>
                  <th className="p-2 text-center font-bold">Data Owner</th>
                  <th className="p-2 text-center font-bold">Data Steward</th>
                  <th className="p-2 text-center font-bold">Custodio TI</th>
                  <th className="p-2 text-center font-bold">Consumidor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {raciMatrix.slice(0, 6).map((item, i) => (
                  <tr key={i}>
                    <td className="p-2 font-sans font-medium text-slate-900">{item.activity}</td>
                    <td className="p-2 text-center font-bold">{item.executiveCouncil}</td>
                    <td className="p-2 text-center font-bold">{item.dataOwner}</td>
                    <td className="p-2 text-center font-bold">{item.dataSteward}</td>
                    <td className="p-2 text-center font-bold">{item.technicalCustodian}</td>
                    <td className="p-2 text-center">{item.dataConsumer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 7: Executive Pitch */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              7. Discurso de Sustentación para el Directorio (Board Pitch)
            </h2>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-2 leading-relaxed text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm">{executivePitch.headline}</h3>
              <p><strong>El Reto:</strong> {executivePitch.contextAndProblem}</p>
              <p><strong>El Costo de No Actuar:</strong> {executivePitch.costOfInaction}</p>
              <p><strong>La Solución Propuesta:</strong> {executivePitch.proposedSolution}</p>
              <p><strong>Impacto de Retorno:</strong> {executivePitch.expectedRoi}</p>
              <p className="font-bold text-indigo-900"><strong>Paso Inmediato:</strong> {executivePitch.callToAction}</p>
            </div>
          </div>

          {/* Signoff block */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs text-slate-500">
            <div>
              <div className="border-b border-slate-400 pb-8 mb-2"></div>
              <span>Firma del Estudiante / Consultor de Datos</span>
            </div>
            <div>
              <div className="border-b border-slate-400 pb-8 mb-2"></div>
              <span>Visto Bueno Sponsor Ejecutivo ({strategy.executiveSponsor || 'Dirección'})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
