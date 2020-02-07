
export interface ClusterFilter {

    supplierId: number;
    withDetails: boolean;

    startDate?: string;
    endDate?: string;

    gsfaId?: number;
    nitgId?: number;
    partId?: number;

    vehicleProjectId: number;
    vehicleIndexId: number;
    vehicleFactoryId: number;

    engineProjectId: number;
    engineIndexId: number;
    engineFactoryId: number;

    gearboxProjectId: number;
    gearboxIndexId: number;
    gearboxFactoryId: number;

    indexId?: number;
    factoryId?: number;

    groupBy: string;
}
