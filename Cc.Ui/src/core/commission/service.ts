import { BaseService } from '../../framework/core/service';
import { Commission } from '../../models';

export class CommissionService extends BaseService<Commission> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Commission, endpoint + 'commission');
    }
}