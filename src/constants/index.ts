/**
 * Constantes partagées du projet
 */

import type { CityPopulation, CityColors } from "../types";

/**
 * Couleurs thématiques par ville
 */
export const CITY_COLORS: CityColors = {
  Bordeaux: "#11273f",
  Montpellier: "#C45500",
};

/**
 * Populations des villes (métropoles)
 */
export const CITY_POPULATIONS: CityPopulation = {
  Bordeaux: 1018000,
  Montpellier: 487000,
};

/**
 * Codes INSEE des communes
 */
export const CITY_CODES = {
  Bordeaux: "33063",
  Montpellier: "34172",
} as const;

/**
 * Types d'offres culturelles
 */
export const OFFER_TYPES = {
  PHYSICAL: "physique",
  DIGITAL: "numérique",
} as const;

/**
 * Villes principales analysées
 */
export const MAIN_CITIES = ["Bordeaux", "Montpellier"] as const;

/**
 * Toutes les villes du dataset
 */
export const ALL_CITIES = ["Bordeaux", "Montpellier", "Talence"] as const;
