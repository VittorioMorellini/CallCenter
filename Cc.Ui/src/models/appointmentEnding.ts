import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('appointmentEnding')
export class AppointmentEnding extends Entity {

    @field()
    id: number;
    @field()
    outcome: string;
    @field()
    color: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): AppointmentEnding {

        let item = new AppointmentEnding();
        return item;
    }
}

@resource('appointmentEnding')
export class AppointmentEndingSearchModel extends Entity implements Pagination {
    
    @field()
    outcome?: string;
    @field()
    color?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}