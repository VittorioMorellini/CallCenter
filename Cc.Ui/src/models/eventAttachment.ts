import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('eventAttachment')
export class EventAttachment extends Entity {

    @field()
    id: number;
    @field()
    eventId: number;
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
    file: ArrayBuffer;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): EventAttachment {

        let item = new EventAttachment();
        return item;
    }
}

@resource('eventAttachment')
export class EventAttachmentSearchModel extends Entity implements Pagination {
    
    @field()
    eventId?: number;
    @field()
    name?: string;
    @field()
    file?: ArrayBuffer;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}