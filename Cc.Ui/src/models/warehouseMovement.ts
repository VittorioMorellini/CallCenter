import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('warehouseMovement')
export class WarehouseMovement extends Entity {

    @field()
    id: number;
    @field()
    warehouseIdFrom: number;
    @field()
    warehouseIdTo: number;
    @field()
    movementDate: string;
    @field()
    productId: number;
    @field()
    quantity: number;
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
    @field()
    notes: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): WarehouseMovement {

        let item = new WarehouseMovement();
        return item;
    }
}

@resource('warehouseMovement')
export class WarehouseMovementSearchModel extends Entity implements Pagination {
    
    @field()
    warehouseIdFrom?: number;
    @field()
    warehouseIdTo?: number;
    @field()
    movementDate?: string;
    @field()
    productId?: number;
    @field()
    quantity?: number;
    @field()
    deleteUser?: string;
    @field()
    deleteDate?: string;
    @field()
    notes?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}