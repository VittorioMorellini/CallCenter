import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('appointmentReject')
export class AppointmentReject extends Entity {

    @field()
    id: number;
    @field()
    reject: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): AppointmentReject {

        let item = new AppointmentReject();
        return item;
    }
}

@resource('appointmentReject')
export class AppointmentRejectSearchModel extends Entity implements Pagination {
    
    @field()
    reject?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}