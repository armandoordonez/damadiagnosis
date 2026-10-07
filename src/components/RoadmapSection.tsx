import React, { useState } from 'react';
import { CompanyStrategyProfile, DimensionScore, MaturityLevel, RoadmapPhase } from '../types/dama';
import {
  generateCustomRoadmap,
  generateRaciMatrix,
  generateExecutivePitch
} from '../utils/damaEngine';

interface RoadmapSectionProps {
  strategy: CompanyStrategyProfile;
  scores: Record<string, MaturityLevel>;
  dimensionScores: DimensionScore[];
  overallCurrent: number;
  overallTarget: number;
  onPrev: () => void;
  onOpenReport: () => void;
  onReset: () => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  strategy,
  scores,
  dimensionScores,
  overallCurrent,
  overallTarget,
  onPrev,
  onOpenReport,
  onReset
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [copiedPitch, setCopiedPitch] = useState(false);

  const roadmapPhases: RoadmapPhase[] = generateCustomRoadmap(scores, strategy, dimensionScores);
  const raciMatrix = generateRaciMatrix();
  const executivePitch = generateExecutivePitch(strategy, dimensionScores, overallCurrent, overallTarget);

  const activePhase = roadmapPhases[activePhaseIndex] || roadmapPhases[0];

  const handleCopyPitch = () => {
    const fullText = `
${executivePitch.headline}

1. CONTEXTO Y PROBLEMA DE NEGOCIO:
${executivePitch.contextAndProblem}

2. COSTO DE LA INACCIÓN:
${executivePitch.costOfInaction}

3. SOLUCIÓN PROPUESTA (ENFOQUE DAMA-DMBOK):
${executivePitch.proposedSolution}

4. RETORNO DE INVERSIÓN (ROI) ESPERADO:
${executivePitch.expectedRoi}

5. PRÓXIMO PASO Y LLAMADO A LA ACCIÓN:
${executivePitch.callToAction}
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataToExport = {
      exportedAt: new Date().toISOString(),
      studentName: strategy.studentName,
      company: strategy.companyName,
      industry: strategy.industry,
      strategyProfile: strategy,
      diagnosticScores: scores,
      overallCurrentMaturity: overallCurrent,
      overallTargetMaturity: overallTarget,
      dimensionScores,
      roadmapPhases,
      executivePitch
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Diagnostico_DAMA_${strategy.companyName.replace(/\s+/g, '_') || 'Empresa'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Intro Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              04. Hoja de Ruta Ejecutiva de Gobierno de Datos
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              Plan estratégico de implementación en 4 fases basado en DAMA-DMBOK 2. Diseñado para mitigar riesgos,
              demostrar valor rápido al negocio y escalar la madurez de {strategy.companyName || 'la organización'}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Ver Informe PDF / Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {roadmapPhases.map((phase, idx) => {
          const isActive = idx === activePhaseIndex;
          return (
            <div
              key={phase.phaseNumber}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                isActive
                  ? 'border-indigo-600 bg-white ring-2 ring-indigo-600/20 shadow-xs'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
                <span>Fase {phase.phaseNumber}</span>
                <span className="font-semibold text-slate-700">{phase.timeframe}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{phase.name}</h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{phase.focusTheme}</p>
            </div>
          );
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-1">
            <span>Fase {activePhase.phaseNumber} de 4</span>
            <span className="text-indigo-600 font-semibold">{activePhase.timeframe}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">{activePhase.name}</h2>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-3xl">
            <strong className="text-slate-800">Objetivo Central:</strong> {activePhase.objective}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 font-medium">KPIs de éxito:</span>
            {activePhase.kpisToMeasure.map((kpi, i) => (
              <span key={i} className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                ✓ {kpi}
              </span>
            ))}
          </div>
        </div>

        {/* Milestones list */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Hitos y Entregables Clave de esta Fase:
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {activePhase.milestones.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/30 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-900">{m.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span>Duración: ~{m.durationWeeks} sem.</span>
                    <span>·</span>
                    <span className="text-slate-700 font-medium">Resp: {m.responsibleRole}</span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed">{m.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-800 text-[11px] block mb-1">
                      Entregables Tangibles:
                    </span>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {m.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800 text-[11px] block mb-1">
                      Artefactos de Gobierno DAMA:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.governanceArtifacts.map((art, aIdx) => (
                        <span key={aIdx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-700">
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DAMA RACI Matrix */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Matriz RACI de Roles de Gobierno (DAMA-DMBOK)
            </h2>
            <div className="text-xs text-slate-500 font-mono">
              R: Realiza · A: Aprueba (Dueño) · C: Consultado · I: Informado
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Define con claridad quién aprueba y quién ejecuta en las actividades de custodia y calidad de datos.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2.5 font-semibold">Actividad Clave de Gobierno</th>
                <th className="py-2.5 font-semibold text-center">Comité / Council</th>
                <th className="py-2.5 font-semibold text-center">Data Owner (Negocio)</th>
                <th className="py-2.5 font-semibold text-center">Data Steward</th>
                <th className="py-2.5 font-semibold text-center">Custodio Técnico</th>
                <th className="py-2.5 font-semibold text-center">Consumidor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {raciMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 font-medium text-slate-900 pr-4">
                    {item.activity}
                    <span className="block text-[11px] text-slate-400 font-normal">
                      {item.damaDimension}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-slate-800">
                    <span className={item.executiveCouncil === 'A' ? 'text-indigo-600' : ''}>
                      {item.executiveCouncil}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-slate-800">
                    <span className={item.dataOwner === 'A' ? 'text-indigo-600' : ''}>
                      {item.dataOwner}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-slate-800">
                    <span className={item.dataSteward === 'A' ? 'text-indigo-600' : ''}>
                      {item.dataSteward}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-slate-800">
                    <span className={item.technicalCustodian === 'A' ? 'text-indigo-600' : ''}>
                      {item.technicalCustodian}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-slate-800">
                    {item.dataConsumer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executive Pitch for Board / MBA Defense */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Pitch Ejecutivo para el Directorio / Sustentación de Maestría
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Discurso estructurado en lenguaje C-Level para convencer al sponsor ejecutivo y obtener financiamiento.
            </p>
          </div>

          <button
            onClick={handleCopyPitch}
            className="self-start sm:self-auto px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer shrink-0"
          >
            {copiedPitch ? '✓ ¡Copiado al Portapapeles!' : 'Copiar Texto del Pitch'}
          </button>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
          <h3 className="font-bold text-slate-900 text-sm">{executivePitch.headline}</h3>

          <div>
            <strong className="text-slate-900 block mb-0.5">1. El Desafío y Situación Actual:</strong>
            <p>{executivePitch.contextAndProblem}</p>
          </div>

          <div>
            <strong className="text-slate-900 block mb-0.5">2. El Costo de la Inacción:</strong>
            <p>{executivePitch.costOfInaction}</p>
          </div>

          <div>
            <strong className="text-slate-900 block mb-0.5">3. La Solución y Enfoque Gradual:</strong>
            <p>{executivePitch.proposedSolution}</p>
          </div>

          <div>
            <strong className="text-slate-900 block mb-0.5">4. Retorno de Inversión y Beneficios Cuantificables:</strong>
            <p>{executivePitch.expectedRoi}</p>
          </div>

          <div>
            <strong className="text-slate-900 block mb-0.5">5. Próximo Paso Inmediato:</strong>
            <p className="font-medium text-indigo-900">{executivePitch.callToAction}</p>
          </div>
        </div>
      </div>

      {/* Global Actions Bar */}
      <div className="bg-slate-900 text-white rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">¿Listo para presentar tu diagnóstico?</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Genera un informe ejecutivo consolidado en formato de impresión / PDF listo para entregar a tu profesor
            o junta directiva, o descarga los datos en formato JSON.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadJson}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
          >
            Descargar JSON
          </button>
          <button
            onClick={onOpenReport}
            className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer shadow-xs"
          >
            Generar Informe PDF
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onPrev}
          className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
        >
          ← Volver al Análisis de Brecha
        </button>

        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
        >
          Reiniciar Diagnóstico
        </button>
      </div>
    </div>
  );
};
