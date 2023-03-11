import { Entity, resource, field, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { TabDistrict } from './tabDistrict';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';

@resource('tabCity')
export class TabCity extends Entity {

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
    tabDistrictId: number;    
    @field()
    code: string;
    @field()
    istatCode: string;
    @field()
    description: string;
    @field()
    cadastralCode: string;
    
    @association(TabDistrict, 'tabDistrictId')
    tabDistrict: TabDistrict;

    guid: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): TabCity {

        let item = new TabCity();
        return item;
    }
}

@resource('tabCity')
export class TabCitySearchModel extends Entity implements Pagination {
    
    @field()
    districtId: number;
    @field()
    districtCode: string;
    @field()
    description: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };

    constructor(data?: any) {
        super()
        this.init(data);      
    }
}