import { BaseService } from '../../framework/core/service';
import { Product } from '../../models';

export class ProductService extends BaseService<Product> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Product, endpoint + 'product');
    }
}