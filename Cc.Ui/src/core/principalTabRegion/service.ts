import { BaseService } from '../../framework/core/service';
import { PrincipalTabRegion } from '../../models';

export class PrincipalTabRegionService extends BaseService<PrincipalTabRegion> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(PrincipalTabRegion, endpoint + 'principalTabRegion');
    }
}