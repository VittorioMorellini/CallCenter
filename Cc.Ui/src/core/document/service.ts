import { BaseService } from '../../framework/core/service';
import { Document } from '../../models';

export class DocumentService extends BaseService<Document> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Document, endpoint + 'document');
    }

    getFileStream(id: number) {
        return this.call(fetch(`${this.endpoint}/file/${id}`, this.createFetchOptions('GET')))       
            .then(this.asArrayBuffer);
    }

    getFileSignedStream(id: number) {
        return this.call(fetch(`${this.endpoint}/file/signed/${id}`, this.createFetchOptions('GET')))       
            .then(this.asArrayBuffer);
    }
}