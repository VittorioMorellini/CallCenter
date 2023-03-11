import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('category')
export class Category extends Entity {

    @field()
    id: number;
    @field()
    description: string;
    @field()
    subProduct: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Category {

        let item = new Category();
        return item;
    }
}

@resource('category')
export class CategorySearchModel extends Entity implements Pagination {
    
    @field()
    description?: string;
    @field()
    subProduct?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}