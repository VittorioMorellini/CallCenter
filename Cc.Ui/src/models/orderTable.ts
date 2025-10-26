import { Entity, resource, field, required } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';

@resource('orderTable')
export class OrderTable extends Entity {

    @field()
    id: number;
    @field()
    appointmentId: number;
    @field()
    totalAmount: number;
    @field()
    vatId: number;
    @field()
    netAmount: number;
    @field()
    commissionId: number;
    @field()
    commissionAmount: number;
    @field()
    orderStateId: number;
    @field()
    notes: string;
    @field()
    date: string;
    @field()
    invoiceDate: string;
    @field()
    invoiceNumber: string;
    @field()
    taxcode: string;
    @field()
    accountholder: string;
    @field()
    vatcode: string;
    @field()
    deposit: number;
    @field()
    balance: number;
    @field()
    insertDate: string;
    @field()
    insertUser: string;
    @field()
    updateDate: string;
    @field()
    updateUser: string;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): OrderTable {

        let item = new OrderTable();
        return item;
    }
}

@resource('orderTable')
export class OrderTableSearchModel extends Entity implements Pagination {
    
    @field()
    appointmentId?: number;
    @field()
    totalAmount?: number;
    @field()
    vatId?: number;
    @field()
    netAmount?: number;
    @field()
    commissionId?: number;
    @field()
    commissionAmount?: number;
    @field()
    orderStateId?: number;
    @field()
    notes?: string;
    @field()
    date?: string;
    @field()
    invoiceDate?: string;
    @field()
    invoiceNumber?: string;
    @field()
    taxcode?: string;
    @field()
    accountholder?: string;
    @field()
    vatcode?: string;
    @field()
    deposit?: number;
    @field()
    balance?: number;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}