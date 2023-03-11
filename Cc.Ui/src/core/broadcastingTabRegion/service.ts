import { BaseService } from '../../framework/core/service';
import { BroadcastingTabRegion } from '../../models';

export class BroadcastingTabRegionService extends BaseService<BroadcastingTabRegion> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(BroadcastingTabRegion, endpoint + 'broadcastingTabRegion');
    }
}