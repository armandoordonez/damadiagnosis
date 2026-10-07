import React from 'react';
import { CompanyArchetype } from '../types/dama';
import { COMPANY_ARCHETYPES } from '../data/companyArchetypes';

interface ArchetypeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArchetype: (archetype: CompanyArchetype) => void;
  onResetToEmpty: () => void;
}

export const ArchetypeSelectorModal: React.FC<ArchetypeSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectArchetype,
  onResetToEmpty
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Casos de Estudio de MBA & Empresas Arquetipo
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Selecciona una empresa prediseñada para explorar cómo se aplica DAMA-DMBOK en distintas industrias o crea tu diagnóstico desde cero.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPANY_ARCHETYPES.map((arch) => (
              <div
                key={arch.id}
                onClick={() => {
                  onSelectArchetype(arch);
                  onClose();
                }}
                className="p-4 rounded-lg border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-indigo-700">{arch.industry}</span>
                    <span className="font-mono text-[11px] text-slate-400">Arquetipo MBA</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {arch.companyName}
                  </h3>
                  <p className="text-xs font-medium text-slate-700 mt-0.5">{arch.tagline}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {arch.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    Objetivo: Nivel {arch.strategy.targetMaturityLevel} ({arch.strategy.preferredOperatingModel})
                  </span>
                  <span className="text-indigo-600 font-semibold group-hover:underline">
                    Cargar caso →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Reset option */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              ¿Prefieres diagnosticar tu propia empresa real desde cero?
            </span>
            <button
              onClick={() => {
                onResetToEmpty();
                onClose();
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Comenzar con Formulario Limpio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
