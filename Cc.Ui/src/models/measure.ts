import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('measure')
export class Measure extends Entity {

    @field()
    id: number;
    @field()
    description: string;
    @field()
    name: string;
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

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Measure {

        let item = new Measure();
        return item;
    }
}

@resource('measure')
export class MeasureSearchModel extends Entity implements Pagination {
    
    @field()
    description?: string;
    @field()
    name?: string;
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