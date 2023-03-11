import { BaseService } from '../../framework/core/service';
import { PrincipalAuth } from '../../models';

export class PrincipalAuthService extends BaseService<PrincipalAuth> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(PrincipalAuth, endpoint + 'principalAuth');
    }
}