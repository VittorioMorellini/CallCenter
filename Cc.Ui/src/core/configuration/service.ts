import { BaseService } from '../../framework/core/service';
import { Configuration } from '../../models';

export class ConfigurationService extends BaseService<Configuration> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Configuration, endpoint + 'configuration');
    }

    getByCompany(companyId: number) {
        return this.call(fetch(`${this.endpoint}/company/${companyId}`, this.createFetchOptions('GET')))
            .then(this.asItem(Configuration))
    }
}