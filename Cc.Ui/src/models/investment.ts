import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { Product } from './product';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import { Broadcasting } from './broadcasting';
import { Category } from './category';

@resource('investment')
export class Investment extends Entity {

    @field()
    id: number;
    @field()
    broadcastingId: number;
    @field()
    dateFrom: string;
    @field()
    dateTo: string;
    @field()
    type: string;
    @field()
    amount: number;
    @field()
    description: string;
    @field()
    productId: number;
    @field()
    categoryId: number;
    @field()
    insertUser: string;
    @field()
    insertDate: string;
    @field()
    updateUser: string;
    @field()
    updateDate: string;
    @field()
    deleteUser: string;
    @field()
    deleteDate: string;

    @association(Product, 'productId', (id: string | number) => cache(LookupKey.PRODUCT, id))
    product: Product;
    @association(Broadcasting, 'broadcastingId', (id: string | number) => cache(LookupKey.BROADCASTING, id))
    broadcasting: Broadcasting;
    @association(Category, 'categoryId', (id: string | number) => cache(LookupKey.CATEGORY, id))
    category: Category;
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Investment {

        let item = new Investment();
        return item;
    }
}

@resource('investment')
export class InvestmentSearchModel extends Entity implements Pagination {
    
    @field()
    broadcastingId?: number;
    @field()
    dateFrom?: string;
    @field()
    dateTo?: string;
    @field()
    type?: string;
    @field()
    amount?: number;
    @field()
    description?: string;
    @field()
    productId?: number;
    @field()
    deleteUser?: string;
    @field()
    deleteDate?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}