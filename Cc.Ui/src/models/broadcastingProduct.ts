import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import { Product } from './product';

@resource('broadcastingProduct')
export class BroadcastingProduct extends Entity {

    @field()
    id: number;
    @field()
    broadcastingId: number;
    @field()
    productId: number;

    @association(Product, 'productId', (id: string | number) => cache(LookupKey.PRODUCT, id))
    product: Product;
    

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): BroadcastingProduct {

        let item = new BroadcastingProduct();
        return item;
    }
}

@resource('broadcastingProduct')
export class BroadcastingProductSearchModel extends Entity implements Pagination {
    
    @field()
    broadcastingId?: number;
    @field()
    productId?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}