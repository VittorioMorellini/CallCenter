import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import moment from 'moment';

@resource('logError')
export class LogError extends Entity {

    @field()
    id: number;
    @field()
    date: string;
    @field()
    user?: string;
    @field()
    companyId?: number;
    @field()
    principalId?: number;
    @field()
    version?: string;
    @field()
    userAgent?: string;
    @field()
    error?: string;
    @field()
    stack?: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): LogError {

        let item = new LogError();
        item.date =  moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS');
        return item;
    }
}

@resource('logAccess')
export class LogErrorSearchModel extends Entity implements Pagination {
    
    @field()
    date?: string;
    @field()
    companyId?: number;
    @field()
    principalId?: number;
    @field()
    user?: string;
    @field()
    version?: string;
    @field()
    userAgent?: string;
    @field()
    error?: string;
    @field()
    stack?: string;

    @field()
    pager: Pager = <Pager> {
        take: 50,
        orderBy: 'id desc'
    };
}