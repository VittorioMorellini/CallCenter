import { Entity, resource, field, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('tabCountry')
export class TabCountry extends Entity {

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
    code: string;
    @field()
    name: string;
    @field()
    localName?: string;
    @field()
    citizenship?: string;
    @field()
    iso2Code?: string;
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): TabCountry {

        let item = new TabCountry();
        return item;
    }
}

@resource('tabCountry')
export class TabCountrySearchModel extends Entity implements Pagination {
        
    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}