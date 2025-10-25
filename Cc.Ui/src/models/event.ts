import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('event')
export class Event extends Entity {

    @field()
    id: number;
    @field()
    orderId: number;
    @field()
    closed: boolean;
    @field()
    lawyerVisible: boolean;
    @field()
    description: string;
    @field()
    eventDate: string;
    @field()
    eventTypeId: number;
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

    static newItem(): Event {

        let item = new Event();
        return item;
    }
}

@resource('event')
export class EventSearchModel extends Entity implements Pagination {
    
    @field()
    orderId?: number;
    @field()
    closed?: boolean;
    @field()
    lawyerVisible?: boolean;
    @field()
    description?: string;
    @field()
    eventDate?: string;
    @field()
    eventTypeId?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}