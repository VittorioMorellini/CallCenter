import { BaseService } from '../../framework/core/service';
import { Broadcasting } from '../../models';

export class BroadcastingService extends BaseService<Broadcasting> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Broadcasting, endpoint + 'broadcasting');
    }
}