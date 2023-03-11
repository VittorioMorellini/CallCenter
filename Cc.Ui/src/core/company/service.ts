import { BaseService } from '../../framework/core/service';
import { Company } from '../../models';

export class CompanyService extends BaseService<Company> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Company, endpoint + 'company');
    }
}