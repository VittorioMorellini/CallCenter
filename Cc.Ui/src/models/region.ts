import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('region')
export class Region extends Entity {

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
    parentId: number;
    @field()
    code: string;
    @field()
    description: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Region {

        let item = new Region();
        return item;
    }
}

@resource('region')
export class RegionSearchModel extends Entity implements Pagination {
    
    @field()
    companyId?: number;
    @field()
    parentId?: number;
    @field()
    code?: string;
    @field()
    description?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}