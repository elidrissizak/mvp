import { DrgGroupby } from './../shared/models/drg-groupby.interface';

export let GROUPBYS = {
    'gsfa': {
        name: 'gsfa', label: 'GSFA_TEXT_FILTER', api: 'gsfas', selectionPropName: 'gsfaIds', icon: ''
    },
    'supplier': {
        label: 'SUPPLIER_ACCOUNT_NUMBER_TEXT', name: 'supplier', icon: 'SUPPLIER_ACCOUNT', api: 'suppliers', selectionPropName: 'supplierIds'
    },
    'nitg': {
        label: 'NITG_TEXT_FILTER', name: 'nitg', icon: 'NITG', api: 'nitgs', selectionPropName: 'nitgIds'
    },
    'part': {
        label: 'REF_PART_FILTER', name: 'part', icon: 'PART_REFERENCE', api: 'parts', selectionPropName: 'partIds'
    },
    'vehicleProject': {
        label: 'VEHICLE_PROJECT_FILTER', icon: 'CAR', name: 'vehicleProject', api: 'vehicleProjects', selectionPropName: 'vehicleProjectIds', sectionName: 'Project'
    },
    'engineProject': {
        label: 'ENGINE_PROJECT_FILTER', icon: 'ENGINE', name: 'engineProject', api: 'engineProjects', selectionPropName: 'engineProjectIds', sectionName: 'Project'
    },
    'gearboxProject': {
        label: 'GEAR_BOX_PROJECT_FILTER', icon: 'GEARBOX', name: 'gearboxProject', api: 'gearboxProjects', selectionPropName: 'gearboxProjectIds', sectionName: 'Project'
    },
    'vehicleIndex': {
        label: 'VEHICLE_INDEX_FILTER', icon: 'CAR', name: 'vehicleIndex', api: 'vehicleIndexes', selectionPropName: 'vehicleIndexIds', sectionName: 'Index'
    },
    'engineIndex': {
        label: 'ENGINE_INDEX_FILTER', icon: 'ENGINE', name: 'engineIndex', api: 'engineIndexes', selectionPropName: 'engineIndexIds', sectionName: 'Index'
    },
    'gearboxIndex': {
        label: 'GEAR_BOX_INDEX_FILTER', icon: 'GEARBOX', name: 'gearboxIndex', api: 'gearboxIndexes', selectionPropName: 'gearboxIndexIds', sectionName: 'Index'
    },
    'vehicleFactory': {
        label: 'VEHICLE_PLANT_FILTER', icon: 'CAR', name: 'vehicleFactory', api: 'vehicleFactories', selectionPropName: 'vehicleFactoryIds', sectionName: 'Factory'
    },
    'engineFactory': {
        label: 'ENGINE_PLANT_FILTER', icon: 'ENGINE', name: 'engineFactory', api: 'engineFactories', selectionPropName: 'engineFactoryIds', sectionName: 'Factory'
    },
    'gearboxFactory': {
        label: 'GEAR_BOX_PLANT_FILTER', icon: 'GEARBOX', name: 'gearboxFactory', api: 'gearboxFactories', selectionPropName: 'gearboxFactoryIds', sectionName: 'Factory'
    },
};
