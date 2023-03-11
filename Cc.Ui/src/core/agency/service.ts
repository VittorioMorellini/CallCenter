import { BaseService } from '../../framework/core/service';
import { Agency } from '../../models';

export class AgencyService extends BaseService<Agency> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Agency, endpoint + 'agency');
    }
}