import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { Agency } from './agency';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import { Product } from './product';
import { Category } from './category';

@resource('principalAuth')
export class PrincipalAuth extends Entity {

    @field()
    id: number;
    @field()
    insertDate: string;
    @field()
    insertUser: string;
    @field()
    updateDate: string;
    @field()
    updateUser: string;
    @field()
    principalId: number;
    @field()
    agencyId?: number;
    @field()
    flowId?: number;
    @field()
    productId?: number;
    @field()
    userPath: string;
    @field()
    categoryId?: number;

    @association(Agency, 'agencyId', (id: string | number) => cache(LookupKey.AGENCY, id))
    agency: Agency;
    @association(Product, 'productId', (id: string | number) => cache(LookupKey.PRODUCT, id))
    product: Product;
    @association(Category, 'categoryId', (id: string | number) => cache(LookupKey.CATEGORY, id))
    category: Category;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): PrincipalAuth {

        let item = new PrincipalAuth();
        return item;
    }
}

@resource('principalAuth')
export class PrincipalAuthSearchModel extends Entity implements Pagination {
    
    @field()
    principalId?: number;
    @field()
    agencyId?: number;
    @field()
    userPath?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}