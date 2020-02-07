import { Period } from './../../bim-assistant/services/period.service';

/**
 * BEWARE: we are using arrays for gsfaIds, nitgIds, etc
 * But in real life the app allows only one id.
 * So, don't be surprised to see these arrays filled with only one element.
 */
export interface DrgFilters {

    period?: Period;
    startDate?: string;
    endDate?: string;

    withSupplier: boolean;

    deductionInd?: Array<number>;
    deductionIndGroup?: Array<number>;

    gsfaIds?: Array<number>;
    nitgIds?: Array<number>;
    supplierIds?: Array<number>;
    partIds?: Array<number>;

    vehicleProjectIds?: Array<number>;
    vehicleIndexIds?: Array<number>;
    vehicleFactoryIds?: Array<number>;

    engineProjectIds?: Array<number>;
    engineIndexIds?: Array<number>;
    engineFactoryIds?: Array<number>;

    gearboxProjectIds?: Array<number>;
    gearboxIndexIds?: Array<number>;
    gearboxFactoryIds?: Array<number>;



  gsfaIdsCodes?: Array<string>;
  nitgIdsCodes?: Array<string>;
  supplierIdsCodes?: Array<string>;
  partIdsCodes?: Array<string>;

  projectIdsCodes?: Array<string>;
  projectIds?: Array<string>;

  indexIdsCodes?: Array<string>;
  indexIds?: Array<string>;

  factoryIdsCodes?: Array<string>;
  factoryIds?: Array<string>;

    selectedSupplierId?: number;
}
