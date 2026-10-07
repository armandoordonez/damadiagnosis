import React, { useState } from 'react';
import { MaturityLevel } from '../types/dama';
import { DAMA_DIMENSIONS } from '../data/damaQuestions';

interface DiagnosticSectionProps {
  scores: Record<string, MaturityLevel>;
  notes: Record<string, string>;
  onScoreChange: (questionId: string, level: MaturityLevel) => void;
  onNoteChange: (questionId: string, note: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const DiagnosticSection: React.FC<DiagnosticSectionProps> = ({
  scores,
  notes,
  onScoreChange,
  onNoteChange,
  onPrev,
  onNext
}) => {
  const [activeDimensionId, setActiveDimensionId] = useState<string>(DAMA_DIMENSIONS[0].id);

  const activeDimension = DAMA_DIMENSIONS.find((d) => d.id === activeDimensionId) || DAMA_DIMENSIONS[0];

  // Calculate overall completion
  const totalQuestions = DAMA_DIMENSIONS.reduce((acc, d) => acc + d.questions.length, 0);
  const answeredCount = Object.keys(scores).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleFillBenchmark = (level: MaturityLevel) => {
    activeDimension.questions.forEach((q) => {
      onScoreChange(q.id, level);
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Intro Header & Progress */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              02. Diagnóstico de Madurez DAMA-DMBOK
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              Evalúa el estado actual de tu empresa frente a las 7 dimensiones clave del cuerpo de conocimiento DAMA.
              Cada nivel del 1 al 5 contiene evidencias observables y criterios específicos de gestión.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium">Progreso Global</span>
              <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                {answeredCount} / {totalQuestions} ({progressPercent}%)
              </div>
            </div>
            <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Dimension Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {DAMA_DIMENSIONS.map((dim, idx) => {
          const isActive = dim.id === activeDimensionId;
          const dimAnswered = dim.questions.filter((q) => scores[q.id] !== undefined).length;
          const isComplete = dimAnswered === dim.questions.length;

          return (
            <button
              key={dim.id}
              onClick={() => setActiveDimensionId(dim.id)}
              className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>{idx + 1}. {dim.shortName}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive
                    ? 'bg-slate-800 text-slate-200'
                    : isComplete
                    ? 'text-emerald-700 font-bold'
                    : 'text-slate-500'
                }`}
              >
                {dimAnswered}/{dim.questions.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Dimension Overview Card */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="flex items-center gap-2 text-slate-500 mb-0.5">
            <span className="font-semibold text-slate-700">{activeDimension.name}</span>
            <span>·</span>
            <span className="font-mono text-slate-500">{activeDimension.dmbokChapter}</span>
          </div>
          <p className="text-slate-600 leading-relaxed">{activeDimension.description}</p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-slate-500 text-[11px]">Asignar a todos:</span>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleFillBenchmark(lvl as MaturityLevel)}
              className="w-6 h-6 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 font-mono text-[11px] font-medium flex items-center justify-center transition-colors cursor-pointer"
              title={`Asignar Nivel ${lvl} a todas las preguntas de esta sección`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List for Active Dimension */}
      <div className="space-y-8">
        {activeDimension.questions.map((question, qIdx) => {
          const selectedScore = scores[question.id];
          const questionNote = notes[question.id] || '';

          return (
            <div
              key={question.id}
              className="bg-white border border-slate-200 rounded-lg p-6 space-y-5"
            >
              {/* Question Header */}
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                  <span>Pregunta {qIdx + 1} de {activeDimension.questions.length}</span>
                  <span className="font-mono text-[11px] text-indigo-700">{question.damaRef}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {question.title}
                </h3>
                <div className="mt-2 text-xs text-slate-600 bg-slate-50 border-l-2 border-indigo-500 pl-3 py-1.5 rounded-r">
                  <span className="font-semibold text-slate-800">Contexto de Negocio:</span>{' '}
                  {question.businessContext}
                </div>
              </div>

              {/* 5-Level Rubrics Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Selecciona el Nivel de Madurez Actual de tu Empresa (1 al 5):
                </label>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
                  {[1, 2, 3, 4, 5].map((lvl) => {
                    const rubric = question.rubrics[lvl as MaturityLevel];
                    const isSelected = selectedScore === lvl;

                    return (
                      <div
                        key={lvl}
                        onClick={() => onScoreChange(question.id, lvl as MaturityLevel)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-600/30 shadow-xs'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              Nivel {lvl}
                            </span>
                            {isSelected && (
                              <span className="text-xs text-indigo-700 font-bold">✓ Seleccionado</span>
                            )}
                          </div>
                          <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                            {rubric.title.replace(/^Nivel \d+:\s*/, '')}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                            {rubric.shortDesc}
                          </p>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-200/80 text-[10px] text-slate-500">
                          <span className="font-semibold text-slate-700">Evidencia:</span>{' '}
                          <span className="italic">{rubric.evidenceExample}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Justification & Student MBA Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Notas de Justificación y Evidencia Real en tu Empresa (Recomendado para entrega académica):
                </label>
                <textarea
                  rows={2}
                  value={questionNote}
                  onChange={(e) => onNoteChange(question.id, e.target.value)}
                  placeholder="Describe brevemente por qué asignaste este nivel en tu empresa (ej. 'Tenemos Salesforce y SAP sin cruzar; el área comercial creó sus propias fórmulas de ventas en Excel...')"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          onClick={onPrev}
          className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
        >
          ← Volver a Estrategia
        </button>

        <div className="flex items-center gap-3">
          {/* Next dimension or next step */}
          {DAMA_DIMENSIONS.findIndex((d) => d.id === activeDimensionId) < DAMA_DIMENSIONS.length - 1 ? (
            <button
              onClick={() => {
                const currentIndex = DAMA_DIMENSIONS.findIndex((d) => d.id === activeDimensionId);
                setActiveDimensionId(DAMA_DIMENSIONS[currentIndex + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
            >
              Siguiente Dimensión DAMA →
            </button>
          ) : null}

          <button
            onClick={onNext}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
          >
            <span>Ver Análisis de Brecha & Radar</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
