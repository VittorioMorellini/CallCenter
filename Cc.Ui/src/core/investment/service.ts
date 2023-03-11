import { BaseService } from '../../framework/core/service';
import { Investment } from '../../models';

export class InvestmentService extends BaseService<Investment> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Investment, endpoint + 'investment');
    }
}