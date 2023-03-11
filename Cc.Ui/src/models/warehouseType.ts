import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('warehouseType')
export class WarehouseType extends Entity {

    @field()
    id: number;
    @field()
    name: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): WarehouseType {

        let item = new WarehouseType();
        return item;
    }
}

@resource('warehouseType')
export class WarehouseTypeSearchModel extends Entity implements Pagination {
    
    @field()
    name?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}