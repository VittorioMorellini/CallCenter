import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { TabRegion } from './tabRegion';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';

@resource('broadcastingTabRegion')
export class BroadcastingTabRegion extends Entity {

    @field()
    id: number;
    @field()
    broadcastingId: number;
    @field()
    tabRegionId: number;

    @association(TabRegion, 'tabRegionId', (id: string | number) => cache(LookupKey.PRODUCT, id))
    tabRegion: TabRegion;
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): BroadcastingTabRegion {

        let item = new BroadcastingTabRegion();
        return item;
    }
}

@resource('broadcastingTabRegion')
export class BroadcastingTabRegionSearchModel extends Entity implements Pagination {
    
    @field()
    broadcastingId?: number;
    @field()
    tabRegionId?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}