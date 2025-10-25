import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('document')
export class Document extends Entity {

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
    status: string;
    @field()
    statusMessage: string;
    @field()
    entity: string;
    @field()
    type: string;
    @field()
    name: string;
    @field()
    file: ArrayBuffer;
    @field()
    repository: string;
    @field()
    externalId: string;
    @field()
    fileSigned: ArrayBuffer;
    @field()
    repositorySigned: string;
    @field()
    externalIdSigned: string;
    @field()
    opened: boolean;
    @field()
    date: string;
    //Extra field for upload
    fileEncoded: string

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Document {

        let item = new Document();
        return item;
    }
}

@resource('document')
export class DocumentSearchModel extends Entity implements Pagination {
    
    @field()
    status?: string;
    @field()
    statusMessage?: string;
    @field()
    entity?: string;
    @field()
    type?: string;
    @field()
    name?: string;
    @field()
    file?: ArrayBuffer;
    @field()
    repository?: string;
    @field()
    externalId?: string;
    @field()
    fileSigned?: ArrayBuffer;
    @field()
    repositorySigned?: string;
    @field()
    externalIdSigned?: string;
    @field()
    opened?: boolean;
    @field()
    date?: string;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}