import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('customerRequiredField')
export class CustomerRequiredField extends Entity {

    @field()
    id: number;
    @field()
    insertDate: string;
    @field()
    insertUser: string;
    @field()
    updateDate: string;
    @field()
    updateUser: string;
    @field()
    companyId: number;
    @field()
    agencyId: number;
    @field()
    productId: number;
    @field()
    base: boolean;
    @field()
    birth: boolean;
    @field()
    identification: boolean;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): CustomerRequiredField {

        let item = new CustomerRequiredField();
        return item;
    }
}

@resource('customerRequiredField')
export class CustomerRequiredFieldSearchModel extends Entity implements Pagination {
    
    @field()
    companyId?: number;
    @field()
    agencyId?: number;
    @field()
    productId?: number;
    @field()
    base?: boolean;
    @field()
    birth?: boolean;
    @field()
    identification?: boolean;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}