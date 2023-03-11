import { BaseService } from '../../framework/core/service';
import { TabDistrict } from '../../models';

export class TabDistrictService extends BaseService<TabDistrict> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(TabDistrict, endpoint + 'tabDistrict');
    }
}