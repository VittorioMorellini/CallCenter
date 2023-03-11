import { BaseService } from '../../framework/core/service';
import { Region } from '../../models';

export class RegionService extends BaseService<Region> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Region, endpoint + 'region');
    }
}