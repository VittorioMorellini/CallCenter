import { BaseService } from '../../framework/core/service';
import { WarehouseType } from '../../models';

export class WarehouseTypeService extends BaseService<WarehouseType> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(WarehouseType, endpoint + 'warehouseType');
    }
}