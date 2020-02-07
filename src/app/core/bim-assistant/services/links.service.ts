import { DrgsRepartitionService } from './../../shared/services/drgs-repartition.service';
import { RestService } from './../../../shared/services/network/rest.service';
import { Injectable } from "@angular/core";
import { DrgFilters } from '../../shared/models/drg-filters.interface';

@Injectable()
export class LinksService {

    constructor(private restService: RestService, private drgsRepartitionService: DrgsRepartitionService) { }

    treat(username: string, filters: DrgFilters) {
        let apiFilters = this.drgsRepartitionService._DrgFiltersToApiFilter(filters);
        return this.restService.put(`/v1/drgs/${username}/treat/?filter=${encodeURIComponent(JSON.stringify(apiFilters))}`);
    }
}
