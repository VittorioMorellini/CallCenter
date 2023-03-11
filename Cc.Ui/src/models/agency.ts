import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { Company } from './company';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';

@resource('agency')
export class Agency extends Entity {

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
    regionId: number;
    @field()
    name: string;
    @field()
    code: string;
    @field()
    provinceCode: string;
    @field()
    cityCode: string;
    @field()
    address: string;
    @field()
    cap: string;
    @field()
    mail: string;
    @field()
    vatCode: string;
    
    @association(Company, 'companyId', (id: string | number) => cache(LookupKey.COMPANY, id))
    company: Company;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Agency {

        let item = new Agency();
        return item;
    }
}

@resource('agency')
export class AgencySearchModel extends Entity implements Pagination {
    
    @field()
    agencyId?: number;
    @field()
    companyId?: number;
    @field()
    regionId?: number;
    @field()
    name?: string;
    @field()
    code?: string;
    @field()
    provinceCode?: string;
    @field()
    cityCode?: string;
    @field()
    address?: string;
    @field()
    cap?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}