/**
 * Service pour le traitement des données culturelles
 * Centralise tous les calculs et statistiques
 */

import type { CulturalData, RadarDimension } from "../types";
import { CITY_POPULATIONS } from "../constants";
import {
  filterByCity,
  countEquipmentByKeyword,
  filterByOfferType,
  calculateEquipmentDiversity,
  calculatePer100k,
  calculatePer1k,
} from "../utils/dataUtils";

/**
 * Calcule les statistiques patrimoniales (musées + monuments)
 */
export function calculatePatrimoineStats(cityData: CulturalData[]): number {
  return (
    countEquipmentByKeyword(cityData, "musée") +
    countEquipmentByKeyword(cityData, "monument")
  );
}

/**
 * Calcule les statistiques des bibliothèques
 */
export function calculateBiblioStats(cityData: CulturalData[]): number {
  return countEquipmentByKeyword(cityData, "bibliothèque");
}

/**
 * Calcule les statistiques des festivals
 */
export function calculateFestivalStats(cityData: CulturalData[]): number {
  return countEquipmentByKeyword(cityData, "festival");
}

/**
 * Calcule les statistiques numériques
 */
export function calculateDigitalStats(cityData: CulturalData[]): number {
  return filterByOfferType(cityData, "numérique").length;
}

/**
 * Calcule les statistiques physiques
 */
export function calculatePhysicalStats(cityData: CulturalData[]): number {
  return filterByOfferType(cityData, "physique").length;
}

/**
 * Génère les dimensions pour le graphique radar
 */
export function generateRadarDimensions(
  data: CulturalData[]
): RadarDimension[] {
  const bordeauxData = filterByCity(data, "Bordeaux");
  const montpellierData = filterByCity(data, "Montpellier");

  const bordeauxPop = CITY_POPULATIONS.Bordeaux;
  const montpellierPop = CITY_POPULATIONS.Montpellier;

  // Calculs pour Bordeaux
  const nbPatrimoineBdx = calculatePatrimoineStats(bordeauxData);
  const nbBibliosBdx = calculateBiblioStats(bordeauxData);
  const nbFestivalsBdx = calculateFestivalStats(bordeauxData);
  const nbNumBdx = calculateDigitalStats(bordeauxData);
  const nbPhysiqueBdx = calculatePhysicalStats(bordeauxData);
  const diversiteBdx = calculateEquipmentDiversity(bordeauxData);

  // Calculs pour Montpellier
  const nbPatrimoineMtp = calculatePatrimoineStats(montpellierData);
  const nbBibliosMtp = calculateBiblioStats(montpellierData);
  const nbFestivalsMtp = calculateFestivalStats(montpellierData);
  const nbNumMtp = calculateDigitalStats(montpellierData);
  const nbPhysiqueMtp = calculatePhysicalStats(montpellierData);
  const diversiteMtp = calculateEquipmentDiversity(montpellierData);

  return [
    {
      label: "Patrimoine\n(Musées + Monuments)\npour 100k hab",
      bordeaux: calculatePer100k(nbPatrimoineBdx, bordeauxPop),
      montpellier: calculatePer100k(nbPatrimoineMtp, montpellierPop),
    },
    {
      label: "Bibliothèques\n(pour 100k hab)",
      bordeaux: calculatePer100k(nbBibliosBdx, bordeauxPop),
      montpellier: calculatePer100k(nbBibliosMtp, montpellierPop),
    },
    {
      label: "Festivals\n(pour 100k hab)",
      bordeaux: calculatePer100k(nbFestivalsBdx, bordeauxPop),
      montpellier: calculatePer100k(nbFestivalsMtp, montpellierPop),
    },
    {
      label: "Innovation\nnumérique\n(pour 100k hab)",
      bordeaux: calculatePer100k(nbNumBdx, bordeauxPop),
      montpellier: calculatePer100k(nbNumMtp, montpellierPop),
    },
    {
      label: "Accessibilité\nphysique globale\n(lieux/1000 hab)",
      bordeaux: calculatePer1k(nbPhysiqueBdx, bordeauxPop),
      montpellier: calculatePer1k(nbPhysiqueMtp, montpellierPop),
    },
    {
      label: "Diversité\ndes équipements\n(types uniques)",
      bordeaux: diversiteBdx,
      montpellier: diversiteMtp,
    },
  ];
}

/**
 * Interface pour les statistiques d'une ville
 */
export interface CityStats {
  patrimoine: number;
  bibliotheques: number;
  festivals: number;
  numerique: number;
  physique: number;
  diversite: number;
}

/**
 * Calcule toutes les statistiques pour une ville
 */
export function calculateCityStats(cityData: CulturalData[]): CityStats {
  return {
    patrimoine: calculatePatrimoineStats(cityData),
    bibliotheques: calculateBiblioStats(cityData),
    festivals: calculateFestivalStats(cityData),
    numerique: calculateDigitalStats(cityData),
    physique: calculatePhysicalStats(cityData),
    diversite: calculateEquipmentDiversity(cityData),
  };
}
