import { BaseService } from '../../framework/core/service';
import { Category } from '../../models';

export class CategoryService extends BaseService<Category> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Category, endpoint + 'category');
    }
}