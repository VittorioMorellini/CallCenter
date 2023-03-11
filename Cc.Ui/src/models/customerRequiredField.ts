import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { Company } from './company';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import { Agency } from './agency';
import { Product } from './product';

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
    processTypeId: number;
    @field()
    companyId: number;
    @field()
    agencyId: number;
    @field()
    flowId: number;
    @field()
    productId: number;
    @field()
    signerTypeId: number;
    @field()
    base: boolean;
    @field()
    birth: boolean;
    @field()
    identification: boolean;

    @association(Company, 'companyId', (id: string | number) => cache(LookupKey.COMPANY, id))
    company: Company;    
    @association(Agency, 'agencyId', (id: string | number) => cache(LookupKey.AGENCY, id))
    agency: Agency;    
    @association(Product, 'productId', (id: string | number) => cache(LookupKey.PRODUCT, id))
    product: Product;    
    
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