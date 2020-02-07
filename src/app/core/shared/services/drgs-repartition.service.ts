import { ClusterFilter } from './../models/cluster-filter.interface';
import { DrgFilters } from './../models/drg-filters.interface';
import { MOCK_CONSTANTS } from './../../../mocks.constants';
import { DateToMysqlDatePipe } from './../pipes/date-to-mysql-date.pipe';
import { ConfigService } from './../../../shared/services/config/config.service';
import { RestService } from './../../../shared/services/network/rest.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PacketDrgBySupplierDeductionTypeResource } from '../models/packet-drg-resource.interface';
import { DrgView } from '../models/drg-view.interface';

export interface DrgsDistribution {
    part: number;
    count: number;
    value: number;
    supplierDeductionType: string;
    frenchLabel: string;
    englishLabel: string;
}

@Injectable()
export class DrgsRepartitionService {

    constructor(
        private restService: RestService,
        private config: ConfigService,
        private dateToMysqlDatePipe: DateToMysqlDatePipe) { }

    /**
     * Convert webapp data to api data.
     * @param filters
     */
    public _DrgFiltersToApiFilter(filters) {
        let apiFilters = { ...filters };
        delete apiFilters.filterName;
        delete apiFilters.selectedSupplierId;
        apiFilters.startDate = this.dateToMysqlDatePipe.transform(apiFilters.period.startDate);
        apiFilters.endDate = this.dateToMysqlDatePipe.transform(apiFilters.period.endDate);
        delete apiFilters.period;
        return apiFilters;
    }

    /**
     * Get distribution for all DRGs.
     */
    public getBim(username: string): Observable<DrgsDistribution[]> {
        if (this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS.getBim));
        }
        return this.restService.get(`/v1/drgs/${username}/statuses/BIM`)
            .map((data: Object[]): DrgsDistribution[] => data.map((d: any): DrgsDistribution => ({
                ...d,
                frenchLabel: d.labelFrSupplierDeduction,
                englishLabel: d.labelEnSupplierDeduction
            })));
    }

    /**
     * Get the DRGs distribution by statuses.
     *
     * @param username
     * @param status Optional.
     * @param startDate Optional. Format is yyyy-mm-dd.
     * @param endDate Optional. Format is yyyy-mm-dd.
     */
    public getByStatuses(
        username: string,
        status: string = undefined,
        startDate = undefined,
        endDate = undefined): Observable<PacketDrgBySupplierDeductionTypeResource[]> {
        if (this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS.getByStatuses));
        }
        const statusParam = status ? `/${status}` : '';
        let params = [];
        startDate && params.push(`startDate=${startDate}`);
        endDate && params.push(`endDate=${endDate}`);
        return this.restService.get(`/v1/drgs/${username}/statuses${statusParam}${params.length > 0 ? '/?' : ''}${params.join('&')}`);
    }

    /**
     * Get the DRGs distribution by deductions.
     * @param username
     * @param withSupplier Default: false.
     */
    public getByDeductions(username: string, withSupplier = false) {
        if (this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS[`/drgs/AT03466/statuses/BIM/deductions?withSupplierCode=${withSupplier}`]))
        }
        return this.restService.get(`/v1/drgs/${username}/statuses/BIM/deductions?withSupplierCode=${withSupplier}`);
    }

    /**
     * Get DRGs distribution by filters.
     * Notice the parameters are almost the same as DrgView.
     * @param username
     * @param groupBy
     * @param filters
     */
    public getByFilter(username: string, groupBy: string, filters: DrgFilters) {
        let apiFilters = this._DrgFiltersToApiFilter(filters);
        if (this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS.getByFilter))
                .map(d => d.map(x => ({ ...x, countSupplier: !(x.id % 2) ? 1 : 2, supplierId: !(x.id % 2) ? x.id : undefined })));
        }
        return this.restService.get(`/v1/drgs/${username}/${groupBy}/?filter=${encodeURIComponent(JSON.stringify(apiFilters))}`);
    }


    /**
     * Export a packet to Excel format.
     * @param username
     * @param packetId
     * @param drgView
     */
    public export(username: string, packetId: number, drgView: DrgView) {
        let apiFilters = this._DrgFiltersToApiFilter(drgView.filters);
        apiFilters[drgView.groupby.selectionPropName] = [packetId]
        return this.restService.download(`/v1/drgs/${username}/export?filter=${encodeURIComponent(JSON.stringify(apiFilters))}`);
    }

    /**
     * Retries suggestions.
     * @param filters
     */
    public getSuggestions(filters: ClusterFilter) {
        if (this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS.getSuggestions));
        }
        return this.restService.get(`/v1/clusters/suggestion/?filter=${encodeURIComponent(JSON.stringify(filters))}`);
    }

  /**
   * Retries suggestions.
   * @param filters
   */
  public removePackets(filters: ClusterFilter) {
      this.restService.delete(`/v1/clusters/remove/?filter=${encodeURIComponent(JSON.stringify(filters))}`);
  }
}
