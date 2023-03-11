import { BaseService } from '../../framework/core/service';
import { BroadcastingProduct } from '../../models';

export class BroadcastingProductService extends BaseService<BroadcastingProduct> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(BroadcastingProduct, endpoint + 'broadcastingProduct');
    }
}