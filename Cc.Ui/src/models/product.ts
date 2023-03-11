import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { Company } from './company';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import { Category } from './category';

@resource('product')
export class Product extends Entity {

    @field()
    id: number;
    @field()
    description: string;
    @field()
    price: number;
    @field()
    code: string;
    @field()
    companyId: number;
    @field()
    insertDate: string;
    @field()
    insertUser: string;
    @field()
    updateDate: string;
    @field()
    updateUser: string;
    @field()
    categoryId: number;

    @association(Company, 'companyId', (id: string | number) => cache(LookupKey.COMPANY, id))
    company: Company;
    @association(Category, 'categoryId', (id: string | number) => cache(LookupKey.CATEGORY, id))
    category: Category;
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Product {

        let item = new Product();
        return item;
    }
}

@resource('product')
export class ProductSearchModel extends Entity implements Pagination {
    
    @field()
    description?: string;
    @field()
    price?: number;
    @field()
    code?: string;
    @field()
    companyId?: number;
    @field()
    categoryId?: number;
    @field()
    disabled?: boolean;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}