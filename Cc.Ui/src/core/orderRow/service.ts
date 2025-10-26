import { BaseService } from '../../framework/core/service';
import { OrderRow } from '../../models';

export class OrderRowService extends BaseService<OrderRow> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(OrderRow, endpoint + 'orderRow');
    }
}