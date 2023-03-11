import { Entity, EntityUtils } from '../entity/index';
import { t } from '../i18n';
import { EntityConstructor } from '../entity/types';

// tslint:disable-next-line:interface-name
export interface IBaseService<T extends Entity> {
    find:   (id: number | string) => Promise<T>;
    search: (model: any) => Promise<T[]>;
    save:   (item: T) => Promise<T>;
    delete: (id: number | string) => Promise<number | string>;
}

export abstract class BaseService<T extends Entity> implements IBaseService<T> {

    protected getAccessToken = () => '';
    protected getCustomHeaders = () => new Map<string, string>() || undefined;

    constructor(private ctor: EntityConstructor<T>, protected endpoint: string) {

    }
    
    find(id: number | string) {

        return this.call(fetch(this.endpoint + `/${id}`, this.createGetFetchOptions()))
            .then(this.asItem(this.ctor));
    }

    search(model: any) {

        return this.call(fetch(this.endpoint + '/search', this.createJsonFetchOptions('POST', model)))
            .then(this.asList(this.ctor));
    }

    save(item: T) {
        return this.call(fetch(this.endpoint, this.createJsonFetchOptions('POST', item)))
            .then(this.asItem(this.ctor));
    }

    delete(id: number | string) {
        return this.call(fetch(this.endpoint, this.createJsonFetchOptions('DELETE', id)))
            .then((response: Response) => Promise.resolve(id));
    }

    protected createGetFetchOptions(customHeaders?: Map<string, string>): RequestInit {
        
        return {
            method: 'GET',
            headers: this.getHeaders(customHeaders)
        };
    }

    protected createFetchOptions(customHeaders?: Map<string, string>): RequestInit {
        
        return {
            method: 'GET',
            headers: this.getHeaders(customHeaders)
        };
    }

    protected createJsonFetchOptions(method: string = 'GET', model?: any, customHeaders?: Map<string, string>): RequestInit {

        let body = EntityUtils.isEntity(model) ? EntityUtils.asJSON(model) : JSON.stringify(model);
        return {
            method,
            headers: this.getHeaders(customHeaders),
            // mode: 'cors',
            body
        };
    }

    protected createBlobFetchOptions(item: any, accessToken?: string, customHeaders?: Map<string, string>): RequestInit {
        
        let body = EntityUtils.isEntity(item) ? EntityUtils.asBlob(item) : new Blob([JSON.stringify(item)], { type: 'application/json' });
        return {
            method: 'POST',
            headers: this.getHeaders(customHeaders),
            body
        };
    }

    protected getHeaders(customHeaders?: Map<string, string>): Headers {

        let token = this.getAccessToken();
        customHeaders = customHeaders || this.getCustomHeaders();        

        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        if (customHeaders !== undefined) {
            customHeaders.forEach((value: string, key: string) => {
                headers.append(key, value)
            })
        }

        if (token !== undefined && token !== '') {
            headers.append('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    fetchError(response: any) {
     
        return response.json().then((error: any) => {
            return Promise.reject(`${response.statusText}: ${error}`);
        });
    }

    asJson(response: Response) {
        if (response.status >= 300) {       
            return response.json().then((error: any) => {
                return Promise.reject(`${response.statusText}: ${error}`);
            });
        } else {
            return response.json();
        }
    }

    asArrayBuffer(response: Response) {
        if (response.status >= 300) {       
            return response.json().then((error: any) => {
                return Promise.reject(`${response.statusText}: ${error}`);
            });
        } else {
            return response.arrayBuffer();
        }
    }

    asItem = <E extends Entity> (ctor: EntityConstructor<E>) => (response: Response) => {
        return this.asJson(response)
            .then(item => EntityUtils.assignItem(item, ctor));
    }

    asList = <E extends Entity> (ctor: EntityConstructor<E>) => (response: Response) => {
        return this.asJson(response)
            .then(list => EntityUtils.assignList(list, ctor));
    }

    handleErrors(response: Response) {

        if (!response.ok) {
            let msg = t(response.status.toString());
            msg = msg !== response.status.toString() ? msg : response.statusText;
            throw Error(msg);
        }
        return response;
    }

    call(fn: Promise<any>) {

        return fn
            .catch(e => {
                let error = e.message !== undefined ? e.message : e.toString();
                throw Error(t(error));
            })
            .then(this.handleErrors);
    }
}