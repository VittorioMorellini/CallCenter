import { BaseService } from '../../framework/core/service';
import { Customer } from '../../models';

export class CustomerService extends BaseService<Customer> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Customer, endpoint + 'customer');
    }
    
}