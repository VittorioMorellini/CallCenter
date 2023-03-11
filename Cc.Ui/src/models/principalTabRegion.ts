import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { TabRegion } from './tabRegion';
import { LookupKey } from '../core/lookup';
import { cache } from '../app/cache';

@resource('principalTabRegion')
export class PrincipalTabRegion extends Entity {

    @field()
    id: number;
    @field()
    principalId: number;
    @field()
    tabRegionId: number;

    @association(TabRegion, 'tabRegionId', (id: string | number) => cache(LookupKey.TAB_REGION, id))
    tabRegion: TabRegion;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): PrincipalTabRegion {

        let item = new PrincipalTabRegion();
        return item;
    }
}

@resource('principalTabRegion')
export class PrincipalTabRegionSearchModel extends Entity implements Pagination {
    
    @field()
    principalId?: number;
    @field()
    tabRegionId?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}