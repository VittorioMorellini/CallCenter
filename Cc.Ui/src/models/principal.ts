import { Entity, resource, field, required, association, regex, regexErrorMessage } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { PrincipalAuth } from './principalAuth';
import { Company } from './company';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import {PrincipalTabRegion} from './principalTabRegion';
import { Appointment } from './appointment';

@resource('principal')
export class Principal extends Entity {
    
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
    @field() @required()
    surname: string;
    @field() @required()
    name: string;
    @field() @required()
    taxCode: string;
    @field() @required()
    mail: string;
    @field()
    phone: string;
    @field()
    mobilePhone: string;
    @field() @required()
    username: string;
    @field() 
    password: string;
    @field() @required()
    role: string;
    @field()
    language?: string;
    @field()
    avatarId?: number;
    @field()
    disabled: boolean;
    @field()
    agendaLocked: boolean;
    @field()
    country: string;
    @field()
    province: string;
    @field()
    city: string;
    @field()
    address: string;
    @field()
    cap: string;
    @field()
    notes: string;
    
    error: string;
    token: string;
    agencyIds: number[];
    productIds: number[];

    @association(Company, 'companyId', (id: string | number) => cache(LookupKey.COMPANY, id))
    company: Company;
    @association(PrincipalAuth)
    principalAuth: PrincipalAuth[];
    @association(PrincipalTabRegion)
    principalTabRegion: PrincipalTabRegion[];
    @association(Appointment)
    appointment: Appointment[];
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Principal {

        let item = new Principal();
        return item;
    }
}

@resource('principal')
export class PrincipalSearchModel extends Entity implements Pagination {
    
    @field()
    companyId?: number;
    @field()
    surname?: string;
    @field()
    name?: string;
    @field()
    taxCode?: string;
    @field()
    mail?: string;
    @field()
    phone?: string;
    @field()
    username?: string;
    @field()
    password?: string;
    @field()
    role?: string;
    @field()
    disabled?: boolean;

    @field()
    pager: Pager = <Pager> {
        take: 20,
        orderBy: 'surname'
    };
}

export class PrincipalUpload extends Entity {

    @field()
    companyId: number;
    @field()
    fileEncoded: string;
    @field()
    filename: string;
    @field()
    notify: boolean;
}

@resource('principalUploadResult')
export class PrincipalUploadResult extends Entity {

    @field()
    error: string;
    @field()
    corrects: number;
    @field()
    usersWithErrors: Principal[] = [];
    @field()
    createdResource: string[] = [];

    get wrongs() {
        return (this.usersWithErrors || []).length;
    }
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

}
