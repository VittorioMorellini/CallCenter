import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('commission')
export class Commission extends Entity {

    @field()
    id: number;
    @field()
    description: string;
    @field()
    percentage: number;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Commission {

        let item = new Commission();
        return item;
    }
}

@resource('commission')
export class CommissionSearchModel extends Entity implements Pagination {
    
    @field()
    description?: string;
    @field()
    percentage?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}