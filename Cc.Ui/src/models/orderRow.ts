import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('orderRow')
export class OrderRow extends Entity {

    @field()
    id: number;
    @field()
    orderId: number;
    @field()
    productId: number;
    @field()
    quantity: number;
    @field()
    measureId: number;
    @field()
    warehouseId: number;
    @field()
    registrationNumber: string;
    @field()
    insertUser: string;
    @field()
    insertDate: string;
    @field()
    updateUser: string;
    @field()
    updateDate: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): OrderRow {

        let item = new OrderRow();
        return item;
    }
}

@resource('orderRow')
export class OrderRowSearchModel extends Entity implements Pagination {
    
    @field()
    orderId?: number;
    @field()
    productId?: number;
    @field()
    quantity?: number;
    @field()
    measureId?: number;
    @field()
    warehouseId?: number;
    @field()
    registrationNumber?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}