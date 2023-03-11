import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('customerCall')
export class CustomerCall extends Entity {

    @field()
    id: number;
    @field()
    description: string;
    @field()
    principalId: number;
    @field()
    customerId: number;
    @field()
    callDate: string;

    // @association(Customer, 'customerId')
    // customer: Customer;
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): CustomerCall {

        let item = new CustomerCall();
        return item;
    }
}

@resource('customerCall')
export class CustomerCallSearchModel extends Entity implements Pagination {
    
    @field()
    description?: string;
    @field()
    principalId?: number;
    @field()
    customerId?: number;
    @field()
    callDate?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}