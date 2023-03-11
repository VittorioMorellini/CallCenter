import { BaseService } from '../../framework/core/service';
import { Warehouse } from '../../models';

export class WarehouseService extends BaseService<Warehouse> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Warehouse, endpoint + 'warehouse');
    }
}