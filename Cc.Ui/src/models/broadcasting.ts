import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { BroadcastingProduct } from './broadcastingProduct';
import { BroadcastingTabRegion } from './broadcastingTabRegion';

@resource('broadcasting')
export class Broadcasting extends Entity {

    @field()
    id: number;
    @field()
    name: string;
    @field()
    type: string;
    @field()
    authorityName: string;
    @field()
    authorityData: string;
    @field()
    notes: string;

    @association(BroadcastingProduct)
    broadcastingProduct: BroadcastingProduct[];
    @association(BroadcastingTabRegion)
    broadcastingTabRegion: BroadcastingTabRegion[];
        
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Broadcasting {

        let item = new Broadcasting();
        return item;
    }
}

@resource('broadcasting')
export class BroadcastingSearchModel extends Entity implements Pagination {
    
    @field()
    name?: string;
    @field()
    type?: string;
    @field()
    authorityName?: string;
    @field()
    authorityData?: string;
    @field()
    notes?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}