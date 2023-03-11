import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('appointmentType')
export class AppointmentType extends Entity {

    @field()
    id: number;
    @field()
    type: string;
    @field()
    page: string;
    @field()
    role: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): AppointmentType {

        let item = new AppointmentType();
        return item;
    }
}

@resource('appointmentType')
export class AppointmentTypeSearchModel extends Entity implements Pagination {
    
    @field()
    type?: string;
    @field()
    page?: string;
    @field()
    role?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}