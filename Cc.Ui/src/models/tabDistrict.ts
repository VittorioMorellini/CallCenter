import { Entity, resource, field, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { TabRegion } from './tabRegion';

@resource('tabDistrict')
export class TabDistrict extends Entity {

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
    tabRegionId: number;
    
    @field()
    code: string;
    @field()
    istatCode: string;
    @field()
    description: string;
    
    @association(TabRegion, 'tabRegionId')
    tabRegion: TabRegion;

    guid: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): TabDistrict {

        let item = new TabDistrict();
        return item;
    }
}

@resource('tabDistrict')
export class TabDistrictSearchModel extends Entity implements Pagination {
    
    @field()
    tabRegionId: number;
    
    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}