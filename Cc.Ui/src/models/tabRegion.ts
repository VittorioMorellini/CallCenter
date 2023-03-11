import { Entity, resource, field, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('tabRegion')
export class TabRegion extends Entity {

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
    description: string;
    @field()
    nationCode: string;
    
    guid: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): TabRegion {

        let item = new TabRegion();
        return item;
    }
}

@resource('tabRegion')
export class TabRegionSearchModel extends Entity implements Pagination {
        
    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}