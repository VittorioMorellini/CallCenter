import { BaseService } from '../../framework/core/service';
import { Measure } from '../../models';

export class MeasureService extends BaseService<Measure> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Measure, endpoint + 'measure');
    }
}