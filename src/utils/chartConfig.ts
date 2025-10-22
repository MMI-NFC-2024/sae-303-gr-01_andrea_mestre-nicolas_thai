/**
 * Utilitaires de configuration pour les graphiques
 */

import type {
  RadarDimension,
  NormalizedRadarDimension,
  RadarDataPoint,
} from "../types";

/**
 * Normalise les dimensions du radar sur une échelle 0-100
 */
export function normalizeRadarDimensions(
  dimensions: RadarDimension[]
): NormalizedRadarDimension[] {
  return dimensions.map((d) => {
    const maxDimension = Math.max(d.bordeaux, d.montpellier);
    return {
      label: d.label,
      bordeaux: (d.bordeaux / maxDimension) * 100,
      montpellier: (d.montpellier / maxDimension) * 100,
      bordeauxRaw: d.bordeaux,
      montpellierRaw: d.montpellier,
    };
  });
}

/**
 * Génère les points de données pour un graphique radar
 */
export function generateRadarData(
  normalizedDimensions: NormalizedRadarDimension[]
): RadarDataPoint[] {
  const radarData: RadarDataPoint[] = [];
  const n = normalizedDimensions.length;
  const angleStep = (2 * Math.PI) / n;

  normalizedDimensions.forEach((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    radarData.push(
      {
        dimension: d.label,
        angle: angle,
        angleDeg: ((angle * 180) / Math.PI + 90) % 360,
        value: d.bordeaux,
        ville: "Bordeaux",
        rawValue: d.bordeauxRaw,
        index: i,
      },
      {
        dimension: d.label,
        angle: angle,
        angleDeg: ((angle * 180) / Math.PI + 90) % 360,
        value: d.montpellier,
        ville: "Montpellier",
        rawValue: d.montpellierRaw,
        index: i,
      }
    );
  });

  return radarData;
}

/**
 * Crée le domaine pour les équipements triés par total
 */
export function createEquipmentDomain(
  totalsByType: Map<string, number>,
  relevantEquipments: string[]
): string[] {
  return Array.from(totalsByType.entries())
    .filter(([type]) => relevantEquipments.includes(type))
    .sort((a, b) => b[1] - a[1])
    .map(([type]) => type);
}
