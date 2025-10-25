import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('vat')
export class Vat extends Entity {

    @field()
    id: number;
    @field()
    description: string;
    @field()
    vatCode: string;
    @field()
    rate: number;
    @field()
    insertDate: string;
    @field()
    insertUser: string;
    @field()
    updateDate: string;
    @field()
    updateUser: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Vat {

        let item = new Vat();
        return item;
    }
}

@resource('vat')
export class VatSearchModel extends Entity implements Pagination {
    
    @field()
    description?: string;
    @field()
    vatCode?: string;
    @field()
    rate?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}