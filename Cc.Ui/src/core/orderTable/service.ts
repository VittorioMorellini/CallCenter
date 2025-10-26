import { BaseService } from '../../framework/core/service';
import { OrderTable } from '../../models';

export class OrderTableService extends BaseService<OrderTable> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(OrderTable, endpoint + 'orderTable');
    }
}