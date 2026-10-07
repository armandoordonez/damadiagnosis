import React, { useState } from 'react';
import { CompanyStrategyProfile, BusinessDriverId, OperatingModelType, MaturityLevel } from '../types/dama';
import { BUSINESS_DRIVERS } from '../data/damaQuestions';

interface StrategySectionProps {
  strategy: CompanyStrategyProfile;
  onChangeStrategy: (updated: Partial<CompanyStrategyProfile>) => void;
  onNext: () => void;
  onOpenArchetypes: () => void;
}

const COMMON_PAIN_POINTS = [
  'Discrepancia en reportes: diferentes áreas reportan números de venta y clientes distintos.',
  'Cierres de mes lentos por conciliaciones manuales interminables en hojas de cálculo.',
  'Registros duplicados de clientes y proveedores entre sistemas CRM y ERP.',
  'Incertidumbre ante auditorías o riesgo de sanciones de privacidad de datos.',
  'Iniciativas de Inteligencia Artificial paralizadas o con resultados no confiables.',
  'Silos departamentales: solicitar acceso a una base de datos toma meses.',
  'Desconocimiento del origen de los datos (caja negra) en los tableros ejecutivos.'
];

export const StrategySection: React.FC<StrategySectionProps> = ({
  strategy,
  onChangeStrategy,
  onNext,
  onOpenArchetypes
}) => {
  const [newPainPoint, setNewPainPoint] = useState('');

  const toggleDriver = (driverId: BusinessDriverId) => {
    const current = [...strategy.primaryDrivers];
    const index = current.indexOf(driverId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(driverId);
    }
    onChangeStrategy({ primaryDrivers: current });
  };

  const togglePainPoint = (point: string) => {
    const current = [...strategy.mainDataPainPoints];
    const index = current.indexOf(point);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(point);
    }
    onChangeStrategy({ mainDataPainPoints: current });
  };

  const addCustomPainPoint = () => {
    if (newPainPoint.trim() && !strategy.mainDataPainPoints.includes(newPainPoint.trim())) {
      onChangeStrategy({
        mainDataPainPoints: [...strategy.mainDataPainPoints, newPainPoint.trim()]
      });
      setNewPainPoint('');
    }
  };

  const removePainPoint = (point: string) => {
    onChangeStrategy({
      mainDataPainPoints: strategy.mainDataPainPoints.filter((p) => p !== point)
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Intro Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              01. Alineación Estratégica & Visión de Negocio
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              De acuerdo con DAMA-DMBOK 2, el Gobierno de Datos no es una iniciativa tecnológica de TI, sino una disciplina
              de negocio para asegurar que los activos de información habiliten la ventaja competitiva y mitiguen riesgos.
            </p>
          </div>
          <button
            onClick={onOpenArchetypes}
            className="self-start sm:self-auto px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Explorar Casos de MBA
          </button>
        </div>
      </div>

      {/* Grid 1: Basic Company & Student Profile */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-semibold text-slate-900">Perfil de la Organización y del Estudiante</h2>
          <p className="text-xs text-slate-500 mt-0.5">Información base para contextualizar el diagnóstico y el informe ejecutivo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nombre del Estudiante / Equipo (Maestría)
            </label>
            <input
              type="text"
              value={strategy.studentName}
              onChange={(e) => onChangeStrategy({ studentName: e.target.value })}
              placeholder="Ej. Juan Pérez - MBA Finanzas & Estrategia"
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nombre de la Empresa o Caso Analizado
            </label>
            <input
              type="text"
              value={strategy.companyName}
              onChange={(e) => onChangeStrategy({ companyName: e.target.value })}
              placeholder="Ej. Banco del Norte / Logística Andina"
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Industria o Sector Económico
            </label>
            <input
              type="text"
              value={strategy.industry}
              onChange={(e) => onChangeStrategy({ industry: e.target.value })}
              placeholder="Ej. Banca, Retail, Salud, Manufactura, Telecomunicaciones..."
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Tamaño de Empresa
              </label>
              <select
                value={strategy.companySize}
                onChange={(e) => onChangeStrategy({ companySize: e.target.value as any })}
                className="w-full text-sm px-2.5 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="startup">Startup (&lt;50 empleados)</option>
                <option value="sme">PyME (50 - 250)</option>
                <option value="midmarket">Mediana (250 - 1,000)</option>
                <option value="enterprise">Corporación (&gt;1,000)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Modelo Comercial
              </label>
              <select
                value={strategy.businessModel}
                onChange={(e) => onChangeStrategy({ businessModel: e.target.value as any })}
                className="w-full text-sm px-2.5 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="B2B">B2B (Empresa a Empresa)</option>
                <option value="B2C">B2C (Consumidor Final)</option>
                <option value="B2B2C">B2B2C (Intermediación)</option>
                <option value="Government">Sector Público / ONG</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid 2: Strategic Vision & Drivers */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-semibold text-slate-900">Visión de Negocio y Objetivos Estratégicos (Drivers)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Selecciona los propulsores estratégicos prioritarios. El diagnóstico evaluará si tus capacidades de datos son suficientes para alcanzarlos.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Declaración de Visión Estratégica de la Empresa (Horizonte 1-3 años)
          </label>
          <textarea
            rows={3}
            value={strategy.strategicVision}
            onChange={(e) => onChangeStrategy({ strategicVision: e.target.value })}
            placeholder="Ejemplo: Expandir la participación de mercado un 25% mediante canales omnicanal unificados, optimizando la rentabilidad por cliente y garantizando estricto cumplimiento ante auditorías regulatorias."
            className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-slate-700">
              Factores Estratégicos Clave (Selecciona de 1 a 3 prioridades)
            </label>
            <span className="text-xs text-slate-500 font-mono">
              {strategy.primaryDrivers.length} seleccionados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {BUSINESS_DRIVERS.map((driver) => {
              const isSelected = strategy.primaryDrivers.includes(driver.id);
              return (
                <div
                  key={driver.id}
                  onClick={() => toggleDriver(driver.id)}
                  className={`p-3.5 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">{driver.name}</span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="mt-0.5 text-indigo-600 rounded-sm focus:ring-indigo-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{driver.description}</p>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">Riesgo si falla:</span>{' '}
                    {driver.businessRisksIfFails[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Sponsor Ejecutivo Principal
            </label>
            <input
              type="text"
              value={strategy.executiveSponsor}
              onChange={(e) => onChangeStrategy({ executiveSponsor: e.target.value })}
              placeholder="Ej. CFO / CRO / Director General"
              className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Horizonte de Implementación
            </label>
            <select
              value={strategy.timeHorizonMonths}
              onChange={(e) => onChangeStrategy({ timeHorizonMonths: Number(e.target.value) })}
              className="w-full text-sm px-2.5 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value={6}>6 meses (Foco Quick Wins rápidos)</option>
              <option value={12}>12 meses (Recomendado estándar)</option>
              <option value={18}>18 meses (Mediana a Gran Empresa)</option>
              <option value={24}>24 meses (Transformación Completa)</option>
              <option value={36}>36 meses (Corporación Multinacional)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nivel de Madurez DAMA Objetivo
            </label>
            <select
              value={strategy.targetMaturityLevel}
              onChange={(e) => onChangeStrategy({ targetMaturityLevel: Number(e.target.value) as MaturityLevel })}
              className="w-full text-sm px-2.5 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value={2}>Nivel 2 - Gestionado Localmente</option>
              <option value={3}>Nivel 3 - Definido e Institucionalizado (Estándar)</option>
              <option value={4}>Nivel 4 - Cuantitativamente Medido con KPIs</option>
              <option value={5}>Nivel 5 - Optimizado & Habilitado para IA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid 3: Operating Model & Pain Points */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-semibold text-slate-900">Modelo Operativo y Dolores Actuales de Datos</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            DAMA-DMBOK describe cómo debe organizarse la autoridad de datos para no burocratizar el negocio.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Modelo Operativo de Gobierno Preferido
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: 'centralized' as OperatingModelType,
                title: 'Centralizado (DGO Fuerte)',
                desc: 'Un equipo centralizado dicta y ejecuta políticas, glosarios y reglas.',
                recommendedFor: 'Ideal para iniciar desde Nivel 1 o sectores hiper-regulados.'
              },
              {
                id: 'federated' as OperatingModelType,
                title: 'Federado / Hub & Spoke (Recomendado)',
                desc: 'Un DGO central define estándares, mientras Data Stewards en las áreas de negocio ejecutan.',
                recommendedFor: 'El estándar de oro para medianas y grandes empresas dinámicas.'
              },
              {
                id: 'domain_mesh' as OperatingModelType,
                title: 'Orientado a Dominios (Data Mesh)',
                desc: 'Equipos autónomos gestionan sus datos como productos certificados.',
                recommendedFor: 'Para scale-ups tecnológicas y organizaciones con alta madurez digital.'
              }
            ].map((model) => {
              const isSelected = strategy.preferredOperatingModel === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => onChangeStrategy({ preferredOperatingModel: model.id })}
                  className={`p-3.5 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">{model.title}</span>
                    <input
                      type="radio"
                      checked={isSelected}
                      readOnly
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{model.desc}</p>
                  <p className="text-[11px] text-indigo-700 font-medium mt-2">{model.recommendedFor}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Principales Dolores de Datos Observados en la Empresa
          </label>
          
          <div className="space-y-2 mb-3">
            {COMMON_PAIN_POINTS.map((point) => {
              const isSelected = strategy.mainDataPainPoints.includes(point);
              return (
                <div
                  key={point}
                  onClick={() => togglePainPoint(point)}
                  className={`text-xs p-2.5 rounded-md border flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 text-indigo-900 font-medium'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{point}</span>
                  <span className="text-xs text-slate-400 font-bold ml-2">
                    {isSelected ? '✓' : '+'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Add custom pain point */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newPainPoint}
              onChange={(e) => setNewPainPoint(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomPainPoint()}
              placeholder="Escribe otro dolor específico de tu empresa y presiona Enter..."
              className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <button
              onClick={addCustomPainPoint}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              Agregar
            </button>
          </div>

          {/* Selected custom pain points list if not in common list */}
          {strategy.mainDataPainPoints.filter((p) => !COMMON_PAIN_POINTS.includes(p)).length > 0 && (
            <div className="mt-3 space-y-1.5">
              <span className="text-[11px] text-slate-500 font-medium">Dolores personalizados agregados:</span>
              {strategy.mainDataPainPoints
                .filter((p) => !COMMON_PAIN_POINTS.includes(p))
                .map((p) => (
                  <div key={p} className="flex items-center justify-between text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
                    <span className="text-slate-800">{p}</span>
                    <button
                      onClick={() => removePainPoint(p)}
                      className="text-slate-400 hover:text-red-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onOpenArchetypes}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
        >
          ¿No tienes una empresa real a mano? Cargar caso de estudio de MBA
        </button>

        <button
          onClick={onNext}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
        >
          <span>Ir al Diagnóstico DAMA (18 Preguntas)</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
