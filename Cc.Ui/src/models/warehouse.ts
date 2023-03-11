import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { WarehouseType } from './warehouseType';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';

@resource('warehouse')
export class Warehouse extends Entity {

    @field()
    id: number;
    @field()
    description: string;
    @field()
    salesmanId: number;
    @field()
    warehouseTypeId: number;
    @field()
    insertUser: string;
    @field()
    insertDate: string;
    @field()
    updateUser: string;
    @field()
    updateDate: string;

    @association(WarehouseType, 'warehouseTypeId', (id: string | number) => cache(LookupKey.WAREHOUSE_TYPE, id))
    warehouseType: WarehouseType;
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Warehouse {

        let item = new Warehouse();
        return item;
    }
}

@resource('warehouse')
export class WarehouseSearchModel extends Entity implements Pagination {
    
    @field()
    description?: string;
    @field()
    salesmanId?: number;
    @field()
    warehouseTypeId?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}