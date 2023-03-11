import { BaseService } from '../../framework/core/service';
import { TabCountry } from '../../models';

export class TabCountryService extends BaseService<TabCountry> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(TabCountry, endpoint + 'tabCountry');
    }
}