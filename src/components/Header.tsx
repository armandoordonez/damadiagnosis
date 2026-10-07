import React from 'react';

interface HeaderProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  onOpenArchetypes: () => void;
  onOpenReport: () => void;
  companyName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onSelectStep,
  onOpenArchetypes,
  onOpenReport,
  companyName
}) => {
  const steps = [
    { id: 1, label: '1. Estrategia & Visión' },
    { id: 2, label: '2. Diagnóstico DAMA' },
    { id: 3, label: '3. Análisis de Brecha' },
    { id: 4, label: '4. Hoja de Ruta' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectStep(1)}
            className="text-left group cursor-pointer"
          >
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              DAMA Navigator
            </span>
          </button>
          {companyName && (
            <span className="hidden sm:inline-block text-xs text-slate-400 font-normal truncate max-w-[160px]">
              / {companyName}
            </span>
          )}
        </div>

        {/* Zone 2: 4 clean text navigation links / step buttons */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs lg:text-sm ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenArchetypes}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
            title="Cargar arquetipos de casos de estudio (Fintech, Retail, Salud, Manufactura, SaaS)"
          >
            Casos de Estudio
          </button>
          <button
            onClick={onOpenReport}
            className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Informe Ejecutivo
          </button>
        </div>
      </div>

      {/* Mobile step bar */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 bg-slate-50 flex items-center justify-between overflow-x-auto gap-2 text-xs">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onSelectStep(step.id)}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
              currentStep === step.id
                ? 'bg-slate-900 text-white font-medium'
                : 'text-slate-600'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
    </header>
  );
};
