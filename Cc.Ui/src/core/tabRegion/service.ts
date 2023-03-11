import { BaseService } from '../../framework/core/service';
import { TabRegion } from '../../models';

export class TabRegionService extends BaseService<TabRegion> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(TabRegion, endpoint + 'tabRegion');
    }
}