import { DrgFilters } from './drg-filters.interface';
import { DrgGroupby } from './drg-groupby.interface';
import { DrgsTreemapDatum } from '../../bim-assistant/services/fetch-drgs.service';

/**
 * DrgView is what the user has selected to see in the Bim Assistant.  
 */
export interface DrgView {
    filters: DrgFilters;
    groupby: DrgGroupby;
    selectedPackets: Array<DrgsTreemapDatum>;
}
