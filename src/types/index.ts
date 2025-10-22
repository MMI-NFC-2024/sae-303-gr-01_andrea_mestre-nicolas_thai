/**
 * Types et interfaces pour les données culturelles
 */

export interface CulturalData {
  nom?: string;
  adresse?: string;
  ville: string;
  code_postal?: number;
  type_equipement?: string;
  latitude?: number;
  longitude?: number;
  type_offre: string;
  type_initiative?: string;
  [key: string]: any;
}

export interface CityPopulation {
  [key: string]: number;
}

export interface CityColors {
  [key: string]: string;
}

export interface LieuxParVilleType {
  ville: string;
  type_offre: string;
  lieux: number;
  habitants_par_lieu: number | null;
}

export interface ButterflyData {
  type: string;
  count: number;
  ville: string;
  countAbs: number;
}

export interface RadarDimension {
  label: string;
  bordeaux: number;
  montpellier: number;
}

export interface NormalizedRadarDimension extends RadarDimension {
  bordeauxRaw: number;
  montpellierRaw: number;
}

export interface RadarDataPoint {
  dimension: string;
  angle: number;
  angleDeg: number;
  value: number;
  ville: string;
  rawValue: number;
  index: number;
}

export interface GeoFeature {
  type: string;
  properties: {
    code?: string;
    nom?: string;
    [key: string]: any;
  };
  geometry: any;
}

export interface GeoFeatureCollection {
  type: "FeatureCollection";
  features: GeoFeature[];
}
