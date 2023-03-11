import { BaseService } from '../../framework/core/service';
import { CustomerCall } from '../../models';

export class CustomerCallService extends BaseService<CustomerCall> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(CustomerCall, endpoint + 'customerCall');
    }
}