import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
// import { CompanyDocument } from './companyDocument';

@resource('company')
export class Company extends Entity {

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
    businessName: string;
    @field()
    vatCode: string;
    @field()
    address: string;
    @field()
    taxCode: string;
    @field()
    mail: string;


    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Company {

        let item = new Company();
        return item;
    }
}

@resource('company')
export class CompanySearchModel extends Entity implements Pagination {
    
    @field()
    companyId?: number;
    @field()
    businessName?: string;
    @field()
    vatCode?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}