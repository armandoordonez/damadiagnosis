import React, { useState, useEffect, useMemo } from 'react';
import { CompanyStrategyProfile, MaturityLevel, CompanyArchetype } from './types/dama';
import { Header } from './components/Header';
import { StrategySection } from './components/StrategySection';
import { DiagnosticSection } from './components/DiagnosticSection';
import { GapAnalysisSection } from './components/GapAnalysisSection';
import { RoadmapSection } from './components/RoadmapSection';
import { ArchetypeSelectorModal } from './components/ArchetypeSelectorModal';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { calculateDimensionScores } from './utils/damaEngine';
import { COMPANY_ARCHETYPES } from './data/companyArchetypes';

const STORAGE_KEY = 'dama_navigator_student_state_v1';

const DEFAULT_STRATEGY: CompanyStrategyProfile = {
  studentName: '',
  companyName: '',
  industry: '',
  companySize: 'enterprise',
  businessModel: 'B2B',
  strategicVision: '',
  primaryDrivers: ['customer_360', 'operational_efficiency'],
  mainDataPainPoints: [
    'Discrepancia en reportes: diferentes áreas reportan números de venta y clientes distintos.',
    'Registros duplicados de clientes y proveedores entre sistemas CRM y ERP.'
  ],
  executiveSponsor: 'CFO / Director General',
  timeHorizonMonths: 12,
  targetMaturityLevel: 3,
  preferredOperatingModel: 'federated'
};

export default function App() {
  // Try to load initial state from localStorage, or start with default
  const [strategy, setStrategy] = useState<CompanyStrategyProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.strategy) return parsed.strategy;
      }
    } catch (e) {
      console.error('Error loading saved strategy:', e);
    }
    // Default to the first archetype as an engaging starting point for students
    return COMPANY_ARCHETYPES[0].strategy;
  });

  const [scores, setScores] = useState<Record<string, MaturityLevel>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.scores) return parsed.scores;
      }
    } catch (e) {
      console.error('Error loading saved scores:', e);
    }
    return COMPANY_ARCHETYPES[0].prefilledScores;
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.notes) return parsed.notes;
      }
    } catch (e) {
      console.error('Error loading saved notes:', e);
    }
    return COMPANY_ARCHETYPES[0].notesPerQuestion || {};
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isArchetypesOpen, setIsArchetypesOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ strategy, scores, notes, currentStep })
      );
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }, [strategy, scores, notes, currentStep]);

  // Derived calculation metrics
  const {
    dimensionScores,
    overallCurrentScore,
    overallTargetScore,
    overallGap
  } = useMemo(() => {
    return calculateDimensionScores(scores, strategy);
  }, [scores, strategy]);

  const handleUpdateStrategy = (updated: Partial<CompanyStrategyProfile>) => {
    setStrategy((prev) => ({ ...prev, ...updated }));
  };

  const handleScoreChange = (questionId: string, level: MaturityLevel) => {
    setScores((prev) => ({ ...prev, [questionId]: level }));
  };

  const handleNoteChange = (questionId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [questionId]: note }));
  };

  const handleSelectArchetype = (archetype: CompanyArchetype) => {
    setStrategy(archetype.strategy);
    setScores(archetype.prefilledScores);
    setNotes(archetype.notesPerQuestion || {});
    setCurrentStep(1);
  };

  const handleResetToEmpty = () => {
    setStrategy(DEFAULT_STRATEGY);
    setScores({});
    setNotes({});
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 antialiased">
      {/* 3-Zone Navigation Header */}
      <Header
        currentStep={currentStep}
        onSelectStep={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArchetypes={() => setIsArchetypesOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        companyName={strategy.companyName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {currentStep === 1 && (
          <StrategySection
            strategy={strategy}
            onChangeStrategy={handleUpdateStrategy}
            onNext={() => {
              setCurrentStep(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenArchetypes={() => setIsArchetypesOpen(true)}
          />
        )}

        {currentStep === 2 && (
          <DiagnosticSection
            scores={scores}
            notes={notes}
            onScoreChange={handleScoreChange}
            onNoteChange={handleNoteChange}
            onPrev={() => {
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNext={() => {
              setCurrentStep(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 3 && (
          <GapAnalysisSection
            strategy={strategy}
            dimensionScores={dimensionScores}
            overallCurrent={overallCurrentScore}
            overallTarget={overallTargetScore}
            overallGap={overallGap}
            onPrev={() => {
              setCurrentStep(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNext={() => {
              setCurrentStep(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 4 && (
          <RoadmapSection
            strategy={strategy}
            scores={scores}
            dimensionScores={dimensionScores}
            overallCurrent={overallCurrentScore}
            overallTarget={overallTargetScore}
            onPrev={() => {
              setCurrentStep(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReport={() => setIsReportOpen(true)}
            onReset={handleResetToEmpty}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">DAMA Navigator</span>
            <span>·</span>
            <span>Marco de Referencia DAMA-DMBOK 2 & CMMI Data Management</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Diseñado para Maestría en Negocios & Business Analytics</span>
            <span>·</span>
            <button
              onClick={() => setIsArchetypesOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              Cambiar Caso de Estudio
            </button>
          </div>
        </div>
      </footer>

      {/* Archetype Selector Modal */}
      <ArchetypeSelectorModal
        isOpen={isArchetypesOpen}
        onClose={() => setIsArchetypesOpen(false)}
        onSelectArchetype={handleSelectArchetype}
        onResetToEmpty={handleResetToEmpty}
      />

      {/* Full Executive Report Modal (Print / PDF) */}
      <ExecutiveReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        strategy={strategy}
        scores={scores}
        notes={notes}
        dimensionScores={dimensionScores}
        overallCurrent={overallCurrentScore}
        overallTarget={overallTargetScore}
        overallGap={overallGap}
      />
    </div>
  );
}
