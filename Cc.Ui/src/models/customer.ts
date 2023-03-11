import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { Company } from './company';
import { Agency } from './agency';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import { TabDistrict } from './tabDistrict';
import { Principal } from './principal';
import { Product } from './product';
import { Broadcasting} from './broadcasting';
import { CustomerCall } from './customerCall';

@resource('customer')
export class Customer extends Entity {

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
    @field() @required()
    companyId: number;
    @field()
    agencyId?: number;
    @field()
    type: string;
    @field()
    lastName: string;
    @field()
    firstName: string; 
    @field()
    taxCode: string;
    @field()
    vatCode: string;
    @field()
    sex: string;
    @field()
    phone: string;
    @field()
    mobilePhone: string;
    @field()
    mail: string;
    @field()
    districtId: number;
    @field()
    city: string;
    @field()
    country: string; 
    @field()
    address: string; 
    @field()
    addressNumber: string;
    @field()
    cap: string; 
    @field()
    identificationDocType: string; 
    @field()
    identificationDocNumber: string; 
    @field()
    identificationDocCountry: string; 
    @field()
    identificationDocReleaseDate: string;
    @field()
    identificationDocExpirationDate: string;
    @field()
    salesmanId: number;
    @field()
    productId: number;
    @field()
    disabled: string;
    @field()
    birthDate: string;
    @field()
    contactDate: string;
    @field()
    recallDate: string;
    @field()
    notes: string;
    @field()
    broadcastingId: number;

    invalidData: boolean; 
    error: string;

    @association(Company, 'companyId', (id: string | number) => cache(LookupKey.COMPANY, id))
    company: Company;
    @association(Agency, 'agencyId', (id: string | number) => cache(LookupKey.AGENCY, id))
    agency: Agency;
    @association(Product, 'productId', (id: string | number) => cache(LookupKey.PRODUCT, id))
    product: Product;
    @association(TabDistrict, 'districtId', (id: string | number) => cache(LookupKey.TAB_DISTRICT, id))
    district: TabDistrict;
    @association(Broadcasting, 'broadcastingId', (id: string | number) => cache(LookupKey.BROADCASTING, id))
    broadcasting: Broadcasting;
    @association(Principal, 'salesmanId')
    principal: Principal;
    @association(CustomerCall)
    customerCall: CustomerCall[]

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Customer {

        let item = new Customer();
        item.type = '0';
        return item;
    }
}

@resource('customer')
export class CustomerSearchModel extends Entity implements Pagination {
    
    @field()
    companyId?: number;
    @field()
    agencyId?: number;
    @field()
    type?: string;
    @field()
    lastName?: string;
    @field()
    firstName?: string;
    @field()
    taxCode?: string;
    @field()
    vatCode?: string;
    @field()
    sex?: string;
    @field()
    phone?: string;
    @field()
    phoneMobile?: string;
    @field()
    mail?: string;
    @field()
    birthDate?: string;
    @field()
    districtId?: number;
    @field()
    city?: string;
    @field()
    country?: string;
    @field()
    address?: string;
    @field()
    addressNumber?: string;
    @field()
    identificationDocType?: string;
    @field()
    identificationDocNumber?: string;
    @field()
    identificationDocReleaseDate?: string;
    @field()
    identificationDocExpirationDate?: string;
    @field()
    salesmanId: number;
    @field()
    disabled?: boolean;
    @field()
    pager: Pager = <Pager> {
        take: 20,
        orderBy: 'lastName'
    };
}

