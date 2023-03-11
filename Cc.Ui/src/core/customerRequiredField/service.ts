import { BaseService } from '../../framework/core/service';
import { CustomerRequiredField, CustomerRequiredFieldSearchModel } from '../../models';

export class CustomerRequiredFieldService extends BaseService<CustomerRequiredField> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(CustomerRequiredField, endpoint + 'customerRequiredField');
    }

    getRequired (model: CustomerRequiredFieldSearchModel) {
        return this.call(fetch(`${this.endpoint}/getRequired`, this.createJsonFetchOptions('POST', model)))
            .then(this.asItem(CustomerRequiredField));
    }

}