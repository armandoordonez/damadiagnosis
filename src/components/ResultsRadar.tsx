import React, { useMemo } from 'react';
import { DimensionScore } from '../types/dama';

interface ResultsRadarProps {
  dimensionScores: DimensionScore[];
  overallCurrent: number;
  overallTarget: number;
  onSelectDimension?: (dimensionId: string) => void;
  selectedDimensionId?: string | null;
}

export const ResultsRadar: React.FC<ResultsRadarProps> = ({
  dimensionScores,
  overallCurrent,
  overallTarget,
  onSelectDimension,
  selectedDimensionId
}) => {
  const size = 380;
  const center = size / 2;
  const radius = (size / 2) - 45;
  const numAxes = dimensionScores.length;
  const maxScore = 5;

  // Calculate polygon points
  const points = useMemo(() => {
    const angleStep = (Math.PI * 2) / numAxes;

    // Grid circles/polygons (levels 1 to 5)
    const gridLevels = [1, 2, 3, 4, 5].map((lvl) => {
      const r = (radius / maxScore) * lvl;
      const polyPoints = dimensionScores.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
      return { lvl, polyPoints };
    });

    // Current scores polygon
    const currentPolyPoints = dimensionScores.map((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const val = Math.max(0.5, Math.min(5, dim.currentScore));
      const r = (radius / maxScore) * val;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, dim, angle };
    });

    // Target scores polygon
    const targetPolyPoints = dimensionScores.map((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const val = Math.max(0.5, Math.min(5, dim.targetScore));
      const r = (radius / maxScore) * val;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, dim, angle };
    });

    // Label anchor positions
    const labelPositions = dimensionScores.map((dim, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const labelRadius = radius + 24;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);
      return { x, y, dim, angle };
    });

    return { gridLevels, currentPolyPoints, targetPolyPoints, labelPositions, angleStep };
  }, [dimensionScores, center, radius, numAxes, maxScore]);

  const currentPointsString = points.currentPolyPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  const targetPointsString = points.targetPolyPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible select-none"
        >
          {/* Circular/Polygon Web Grids */}
          {points.gridLevels.map(({ lvl, polyPoints }) => (
            <g key={lvl}>
              <polygon
                points={polyPoints}
                fill={lvl === 5 ? '#f8fafc' : 'none'}
                stroke="#e2e8f0"
                strokeWidth={lvl === 5 ? '1.5' : '1'}
                strokeDasharray={lvl < 5 ? '3 3' : undefined}
              />
              <text
                x={center}
                y={center - (radius / maxScore) * lvl + 10}
                fontSize="9"
                fill="#94a3b8"
                textAnchor="middle"
                className="font-mono"
              >
                {lvl}
              </text>
            </g>
          ))}

          {/* Axes lines from center to outer vertex */}
          {points.labelPositions.map((pos, i) => {
            const angle = i * points.angleStep - Math.PI / 2;
            const endX = center + radius * Math.cos(angle);
            const endY = center + radius * Math.sin(angle);
            const isSelected = selectedDimensionId === pos.dim.dimensionId;

            return (
              <line
                key={pos.dim.dimensionId}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke={isSelected ? '#6366f1' : '#cbd5e1'}
                strokeWidth={isSelected ? '2' : '1'}
              />
            );
          })}

          {/* Target Maturity Polygon (Target Profile) */}
          <polygon
            points={targetPointsString}
            fill="rgba(99, 102, 241, 0.08)"
            stroke="#6366f1"
            strokeWidth="1.75"
            strokeDasharray="4 4"
          />

          {/* Current Maturity Polygon (Current Profile) */}
          <polygon
            points={currentPointsString}
            fill="rgba(16, 185, 129, 0.22)"
            stroke="#059669"
            strokeWidth="2.5"
          />

          {/* Target points */}
          {points.targetPolyPoints.map((p) => (
            <circle
              key={`target-${p.dim.dimensionId}`}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#ffffff"
              stroke="#6366f1"
              strokeWidth="1.5"
            />
          ))}

          {/* Current points (interactive on hover / click) */}
          {points.currentPolyPoints.map((p) => {
            const isSelected = selectedDimensionId === p.dim.dimensionId;
            return (
              <g
                key={`current-${p.dim.dimensionId}`}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => onSelectDimension && onSelectDimension(p.dim.dimensionId)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? '6' : '4.5'}
                  fill={p.dim.criticalForStrategy ? '#dc2626' : '#059669'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* Dimension Labels */}
          {points.labelPositions.map((pos) => {
            const isSelected = selectedDimensionId === pos.dim.dimensionId;
            // Align text based on horizontal position
            let anchor: 'middle' | 'start' | 'end' = 'middle';
            if (pos.x < center - 20) anchor = 'end';
            else if (pos.x > center + 20) anchor = 'start';

            return (
              <g
                key={`lbl-${pos.dim.dimensionId}`}
                className="cursor-pointer"
                onClick={() => onSelectDimension && onSelectDimension(pos.dim.dimensionId)}
              >
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor={anchor}
                  fontSize="10"
                  fontWeight={isSelected ? '700' : '600'}
                  fill={isSelected ? '#4338ca' : '#334155'}
                  className="transition-colors hover:fill-indigo-600"
                >
                  {pos.dim.dimensionName.split(',')[0]}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 11}
                  textAnchor={anchor}
                  fontSize="9"
                  fill="#64748b"
                  className="font-mono tabular-nums"
                >
                  {pos.dim.currentScore.toFixed(1)} / {pos.dim.targetScore}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend & Summary */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-sm bg-emerald-600/30 border border-emerald-600 inline-block"></span>
          <span className="font-medium text-slate-800">Estado Actual: {overallCurrent.toFixed(1)}/5.0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-sm bg-indigo-500/20 border border-dashed border-indigo-600 inline-block"></span>
          <span className="font-medium text-slate-800">Visión Objetivo: {overallTarget.toFixed(1)}/5.0</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
          <span>Dimensión Crítica para la Estrategia</span>
        </div>
      </div>
    </div>
  );
};
