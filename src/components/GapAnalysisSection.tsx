import React, { useState } from 'react';
import { CompanyStrategyProfile, DimensionScore, MaturityLevel } from '../types/dama';
import { ResultsRadar } from './ResultsRadar';
import { getMaturityStageInfo, generateStrategicInsights, generatePrioritizationMatrix } from '../utils/damaEngine';

interface GapAnalysisSectionProps {
  strategy: CompanyStrategyProfile;
  dimensionScores: DimensionScore[];
  overallCurrent: number;
  overallTarget: number;
  overallGap: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectDimensionToEdit?: (dimId: string) => void;
}

export const GapAnalysisSection: React.FC<GapAnalysisSectionProps> = ({
  strategy,
  dimensionScores,
  overallCurrent,
  overallTarget,
  overallGap,
  onPrev,
  onNext,
  onSelectDimensionToEdit
}) => {
  const [selectedDimId, setSelectedDimId] = useState<string | null>(null);

  const maturityInfo = getMaturityStageInfo(overallCurrent);
  const insights = generateStrategicInsights(dimensionScores, strategy);
  const prioritizationInitiatives = generatePrioritizationMatrix(dimensionScores, strategy);

  const quickWins = prioritizationInitiatives.filter((i) => i.quadrant === 'quick_wins');
  const strategicBets = prioritizationInitiatives.filter((i) => i.quadrant === 'strategic_bets');
  const tacticalEnhancements = prioritizationInitiatives.filter((i) => i.quadrant === 'tactical_enhancements');
  const fillIns = prioritizationInitiatives.filter((i) => i.quadrant === 'fill_ins');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Intro Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              03. Radar de Madurez y Análisis de Brecha (Gap Analysis)
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              Comparativa objetiva entre la situación actual de {strategy.companyName || 'la empresa'} y la visión objetivo esperada.
              Identifica los cuellos de botella que ponen en riesgo la estrategia de negocio.
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-xs text-slate-500 font-mono">
              Horizonte: {strategy.timeHorizonMonths} meses
            </span>
          </div>
        </div>
      </div>

      {/* Executive Scorecard Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Madurez Actual</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                {overallCurrent.toFixed(1)}
              </span>
              <span className="text-sm text-slate-400 font-mono">/ 5.0</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-indigo-700">
              {maturityInfo.name}
            </div>
          </div>

          <div className="border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Meta Estratégica</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-indigo-600 font-mono tabular-nums">
                {overallTarget.toFixed(1)}
              </span>
              <span className="text-sm text-slate-400 font-mono">/ 5.0</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Plazo proyectado: {strategy.timeHorizonMonths} meses
            </div>
          </div>

          <div className="border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Brecha Global (Gap)</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-amber-600 font-mono tabular-nums">
                {overallGap.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500">puntos a cerrar</span>
            </div>
            <div className="mt-2 text-xs text-slate-600">
              {overallGap > 1.5 ? 'Brecha sustancial' : 'Brecha moderada'}
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Diagnóstico C-Level</span>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {maturityInfo.executiveSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Main Analysis: Radar Chart + Dimension Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Radar */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-slate-900">Radar DAMA-DMBOK</h2>
              <span className="text-xs text-slate-400">7 Dimensiones</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Puntos rojos indican dimensiones críticas que apalancan directamente la estrategia de negocio seleccionada.
            </p>
          </div>

          <ResultsRadar
            dimensionScores={dimensionScores}
            overallCurrent={overallCurrent}
            overallTarget={overallTarget}
            selectedDimensionId={selectedDimId}
            onSelectDimension={(id) => setSelectedDimId(id === selectedDimId ? null : id)}
          />

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            Haz clic en los puntos del radar para inspeccionar o filtrar cada dimensión.
          </div>
        </div>

        {/* Right Column: Scorecard Table & Details */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Desglose de Puntuaciones y Brechas</h2>
            <span className="text-xs text-slate-500 font-mono">Escala CMMI 1.0 a 5.0</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2.5 font-semibold">Dimensión DAMA</th>
                  <th className="py-2.5 font-semibold text-right">Actual</th>
                  <th className="py-2.5 font-semibold text-right">Meta</th>
                  <th className="py-2.5 font-semibold text-right">Brecha</th>
                  <th className="py-2.5 font-semibold text-center">Estratégica</th>
                  <th className="py-2.5 font-semibold text-right">Prioridad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dimensionScores.map((dim) => {
                  const isSelected = selectedDimId === dim.dimensionId;
                  return (
                    <tr
                      key={dim.dimensionId}
                      onClick={() => setSelectedDimId(isSelected ? null : dim.dimensionId)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-indigo-50/80'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${dim.criticalForStrategy ? 'bg-red-500' : 'bg-slate-300'}`}></span>
                          <span>{dim.dimensionName}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right font-mono tabular-nums text-slate-700">
                        {dim.currentScore.toFixed(1)}
                      </td>
                      <td className="py-3 text-right font-mono tabular-nums text-indigo-700 font-semibold">
                        {dim.targetScore}
                      </td>
                      <td className="py-3 text-right font-mono tabular-nums text-amber-700 font-semibold">
                        +{dim.gap.toFixed(1)}
                      </td>
                      <td className="py-3 text-center">
                        {dim.criticalForStrategy ? (
                          <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                            Crítica
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Soporte</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {dim.status === 'critical' ? (
                          <span className="text-[11px] font-semibold text-red-600">Alta</span>
                        ) : dim.status === 'moderate' ? (
                          <span className="text-[11px] font-semibold text-amber-600">Media</span>
                        ) : (
                          <span className="text-[11px] text-emerald-600">Alineada</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Strategic Context Alert */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">Alineación con la Estrategia:</span>{' '}
            {insights.strategicAlignmentAlert}
          </div>
        </div>
      </div>

      {/* Strategic Bottlenecks Analysis */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Cuellos de Botella Críticos Identificados</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Las mayores brechas analizadas a la luz de los objetivos corporativos declarados por {strategy.companyName || 'la empresa'}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.bottlenecks.map((b, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50/40 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 text-sm">{b.dimension}</span>
                <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Brecha: +{b.gap.toFixed(1)} pts
                </span>
              </div>
              <p className="text-slate-700">{b.analysis}</p>
              <div className="pt-2 border-t border-slate-200 text-slate-600">
                <span className="font-semibold text-slate-800">Impacto en la Visión:</span> {b.impactOnVision}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prioritization Matrix (Impact vs Effort) */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Matriz de Priorización de Iniciativas (Impacto vs. Esfuerzo)
            </h2>
            <span className="text-xs text-slate-500">Metodología DAMA Implementation</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            DAMA aconseja no intentar resolver todo a la vez. Las organizaciones deben comenzar en el cuadrante de 
            <strong className="text-slate-800"> Victorias Rápidas (Quick Wins)</strong> para consolidar credibilidad y financiamiento ejecutivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quick Wins (High Impact, Low/Med Effort) */}
          <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-900 text-xs uppercase tracking-wider">
                1. Victorias Rápidas (Quick Wins)
              </span>
              <span className="text-[11px] text-emerald-800 font-medium">Alto Impacto · Menor Esfuerzo</span>
            </div>
            <p className="text-xs text-emerald-800">Iniciativas para los primeros 3 a 6 meses que demuestran valor inmediato:</p>
            <div className="space-y-2">
              {quickWins.map((init) => (
                <div key={init.id} className="p-2.5 rounded bg-white border border-emerald-200 text-xs shadow-2xs">
                  <span className="font-semibold text-slate-900">{init.name}</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{init.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Bets (High Impact, High Effort) */}
          <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-indigo-900 text-xs uppercase tracking-wider">
                2. Grandes Apuestas Estratégicas
              </span>
              <span className="text-[11px] text-indigo-800 font-medium">Alto Impacto · Alto Esfuerzo</span>
            </div>
            <p className="text-xs text-indigo-800">Proyectos estructurales a planificar para las Fases 2 y 3:</p>
            <div className="space-y-2">
              {strategicBets.map((init) => (
                <div key={init.id} className="p-2.5 rounded bg-white border border-indigo-200 text-xs shadow-2xs">
                  <span className="font-semibold text-slate-900">{init.name}</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{init.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Enhancements (Medium Impact, Low Effort) */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 text-xs uppercase tracking-wider">
                3. Mejoras Tácticas Progresivas
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Medio Impacto · Menor Esfuerzo</span>
            </div>
            <div className="space-y-2">
              {tacticalEnhancements.map((init) => (
                <div key={init.id} className="p-2.5 rounded bg-white border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-900">{init.name}</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{init.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Fill-ins (Low Impact, High Effort) */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
                4. Actividades Secundarias (Evitar Ahora)
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Bajo Impacto · Alto Esfuerzo</span>
            </div>
            <p className="text-xs text-slate-500">Tareas que consumen tiempo y no deben desenfocar el programa inicial:</p>
            <div className="space-y-2">
              {fillIns.map((init) => (
                <div key={init.id} className="p-2.5 rounded bg-white border border-slate-200 text-xs text-slate-500">
                  <span className="font-medium">{init.name}</span>
                  <p className="text-[11px] mt-0.5">{init.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          onClick={onPrev}
          className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
        >
          ← Volver al Diagnóstico
        </button>

        <button
          onClick={onNext}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
        >
          <span>Ver Hoja de Ruta Ejecutiva (Roadmap)</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
