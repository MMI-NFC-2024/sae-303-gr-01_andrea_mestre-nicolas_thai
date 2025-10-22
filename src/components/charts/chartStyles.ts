/**
 * Configuration et styles partagés pour tous les graphiques Observable Plot
 */

import type { CityColors } from "../../types";

/**
 * Styles de base pour tous les graphiques
 */
export const BASE_PLOT_STYLE = {
  background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
  fontSize: "14px",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  color: "#000000",
} as const;

/**
 * Style alternatif avec gradient diagonal
 */
export const GRADIENT_PLOT_STYLE = {
  background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  color: "#000000",
} as const;

/**
 * Marges par défaut pour les graphiques
 */
export const DEFAULT_MARGINS = {
  marginTop: 40,
  marginBottom: 70,
  marginLeft: 100,
  marginRight: 20,
} as const;

/**
 * Marges pour les graphiques géographiques
 */
export const GEO_MARGINS = {
  marginTop: 40,
  marginBottom: 50,
  marginLeft: 20,
  marginRight: 20,
} as const;

/**
 * Configuration de couleur standard pour les villes
 */
export function getCityColorConfig(colors: CityColors) {
  return {
    domain: ["Bordeaux", "Montpellier"],
    range: [colors.Bordeaux, colors.Montpellier],
    legend: true,
    label: "Ville",
  };
}

/**
 * Configuration de couleur pour les types d'offre
 */
export function getOfferTypeColorConfig(colors: CityColors) {
  return {
    legend: true,
    label: "Type d'offre culturelle",
    domain: ["physique", "numérique"],
    range: [colors.Bordeaux, colors.Montpellier],
    tickFormat: (d: string) =>
      d === "physique" ? "Lieu physique" : "Initiative numérique",
    marginLeft: 40,
  };
}

/**
 * Configuration standard pour l'axe Y avec grille
 */
export const Y_AXIS_WITH_GRID = {
  grid: true,
  labelAnchor: "top" as const,
  labelOffset: 40,
};

/**
 * Dimensions standard pour les graphiques en barres
 */
export const BAR_CHART_DIMENSIONS = {
  height: 480,
  width: 560,
} as const;

/**
 * Dimensions pour les cartes géographiques
 */
export const GEO_CHART_DIMENSIONS = {
  height: 680,
  width: 550,
} as const;

/**
 * Configuration des tooltips (tips) standard
 */
export function getStandardTip(colors: CityColors) {
  return {
    fill: "#ffffff",
    stroke: (d: any) =>
      d.ville === "Bordeaux" ? colors.Bordeaux : colors.Montpellier,
    strokeWidth: 3,
  };
}

/**
 * Règle Y à zéro (ligne de base)
 */
export const ZERO_RULE = {
  stroke: "#333",
  strokeWidth: 1.5,
};

/**
 * Style pour les points géographiques (ombre)
 */
export const GEO_POINT_SHADOW = {
  fill: "#000000",
  opacity: 0.1,
  dx: 1,
  dy: 1,
};

/**
 * Style pour les bordures géographiques
 */
export const GEO_BORDER_STYLE = {
  fill: "#ffffff",
  stroke: "#495057",
  strokeWidth: 1.2,
  strokeOpacity: 0.8,
};
