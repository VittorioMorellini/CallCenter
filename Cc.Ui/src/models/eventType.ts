import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('eventType')
export class EventType extends Entity {

    @field()
    id: number;
    @field()
    name: string;
    @field()
    description: string;
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

    static newItem(): EventType {

        let item = new EventType();
        return item;
    }
}

@resource('eventType')
export class EventTypeSearchModel extends Entity implements Pagination {
    
    @field()
    name?: string;
    @field()
    description?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}