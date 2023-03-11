import { BaseService } from '../../framework/core/service';
import { TabCity } from '../../models';

export class TabCityService extends BaseService<TabCity> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(TabCity, endpoint + 'tabCity');
    }
}