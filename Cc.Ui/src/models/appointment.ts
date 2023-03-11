import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('appointment')
export class Appointment extends Entity {

    @field()
    id: number;
    @field()
    eventId: number;
    @field()
    appointmentTypeId: number;
    @field()
    appointmentEndingId: number;
    @field()
    motivation: string;
    @field()
    salesmanId: number;
    @field()
    customerId: number;
    @field()
    district: string;
    @field()
    productId: number;
    @field()
    dateFrom: string;
    @field()
    dateTo: string;
    @field()
    state: number;
    @field()
    insertUser: string;
    @field()
    insertDate: string;
    @field()
    updateUser: string;
    @field()
    updateDate: string;
    @field()
    title?: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Appointment {

        let item = new Appointment();
        return item;
    }
}

@resource('appointment')
export class AppointmentSearchModel extends Entity implements Pagination {
    
    @field()
    eventId?: number;
    @field()
    appointmentTypeId?: number;
    @field()
    appointmentEndingId?: number;
    @field()
    motivation?: string;
    @field()
    salesmanId?: number;
    @field()
    customerId?: number;
    @field()
    district?: string;
    @field()
    productId?: number;
    @field()
    dateFrom?: string;
    @field()
    dateTo?: string;
    @field()
    state?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}