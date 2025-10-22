/**
 * Utilitaires pour le traitement des données culturelles
 */

import type {
  CulturalData,
  GeoFeatureCollection,
  LieuxParVilleType,
  ButterflyData,
} from "../types";
import { CITY_POPULATIONS, CITY_CODES, OFFER_TYPES } from "../constants";

/**
 * Filtre les données par ville
 */
export function filterByCity(
  data: CulturalData[],
  city: string
): CulturalData[] {
  return data.filter((d) => d.ville === city);
}

/**
 * Filtre les données par type d'offre
 */
export function filterByOfferType(
  data: CulturalData[],
  offerType: "physique" | "numérique"
): CulturalData[] {
  return data.filter((d) => d.type_offre === offerType);
}

/**
 * Filtre les données par ville et type d'offre
 */
export function filterByCityAndOfferType(
  data: CulturalData[],
  city: string,
  offerType: "physique" | "numérique"
): CulturalData[] {
  return data.filter((d) => d.ville === city && d.type_offre === offerType);
}

/**
 * Filtre les données par type d'équipement
 */
export function filterByEquipmentType(
  data: CulturalData[],
  equipmentType: string
): CulturalData[] {
  return data.filter((d) => d.type_equipement === equipmentType);
}

/**
 * Compte le nombre d'équipements contenant un mot-clé
 */
export function countEquipmentByKeyword(
  data: CulturalData[],
  keyword: string
): number {
  return data.filter((d) =>
    d.type_equipement?.toLowerCase().includes(keyword.toLowerCase())
  ).length;
}

/**
 * Extrait tous les types d'équipements uniques
 */
export function getUniqueEquipmentTypes(data: CulturalData[]): string[] {
  return Array.from(
    new Set(
      data
        .filter(
          (d) => d.type_offre === OFFER_TYPES.PHYSICAL && d.type_equipement
        )
        .map((d) => d.type_equipement!)
    )
  ).sort();
}

/**
 * Calcule la diversité des équipements pour une ville
 */
export function calculateEquipmentDiversity(data: CulturalData[]): number {
  return new Set(data.map((d) => d.type_equipement)).size;
}

/**
 * Crée une FeatureCollection géographique pour une ville
 */
export function createCityGeoFeatures(
  communes: GeoFeatureCollection,
  cityCode: string,
  cityName: string
): GeoFeatureCollection {
  return {
    type: "FeatureCollection",
    features: communes.features.filter(
      (d) =>
        d.properties.code === cityCode ||
        d.properties.nom?.toLowerCase() === cityName.toLowerCase()
    ),
  };
}

/**
 * Calcule le nombre de lieux par ville et type d'offre
 */
export function calculateLieuxParVilleType(
  data: CulturalData[],
  cities: string[]
): LieuxParVilleType[] {
  const typesOffre: ("physique" | "numérique")[] = ["physique", "numérique"];

  return cities
    .flatMap((ville) => {
      return typesOffre.map((type_offre) => {
        const lieux = filterByCityAndOfferType(data, ville, type_offre).length;
        const pop = CITY_POPULATIONS[ville];

        return {
          ville,
          type_offre,
          lieux,
          habitants_par_lieu: pop && lieux > 0 ? Math.round(pop / lieux) : null,
        };
      });
    })
    .filter((d) => d.habitants_par_lieu !== null);
}

/**
 * Calcule les données pour le graphique butterfly
 */
export function calculateButterflyData(
  bordeauxData: CulturalData[],
  montpellierData: CulturalData[],
  equipmentTypes: string[]
): ButterflyData[] {
  return equipmentTypes
    .map((type) => {
      const bordeauxCount = filterByEquipmentType(
        filterByOfferType(bordeauxData, OFFER_TYPES.PHYSICAL),
        type
      ).length;

      const montpellierCount = filterByEquipmentType(
        filterByOfferType(montpellierData, OFFER_TYPES.PHYSICAL),
        type
      ).length;

      return [
        {
          type: type,
          count: -bordeauxCount,
          ville: "Bordeaux",
          countAbs: bordeauxCount,
        },
        {
          type: type,
          count: montpellierCount,
          ville: "Montpellier",
          countAbs: montpellierCount,
        },
      ];
    })
    .flat()
    .filter((d) => d.countAbs > 0);
}

/**
 * Filtre les équipements pertinents (avec un seuil minimum)
 */
export function filterRelevantEquipments(
  butterflyData: ButterflyData[],
  minCount: number = 3,
  maxResults: number = 10
): string[] {
  const totalsByType = new Map<string, number>();

  butterflyData.forEach((d) => {
    const current = totalsByType.get(d.type) || 0;
    totalsByType.set(d.type, current + d.countAbs);
  });

  return Array.from(totalsByType.entries())
    .filter(([type, count]) => count >= minCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxResults)
    .map(([type]) => type);
}

/**
 * Calcule un ratio pour 100 000 habitants
 */
export function calculatePer100k(count: number, population: number): number {
  return (count / population) * 100000;
}

/**
 * Calcule un ratio pour 1000 habitants
 */
export function calculatePer1k(count: number, population: number): number {
  return (count / population) * 1000;
}
