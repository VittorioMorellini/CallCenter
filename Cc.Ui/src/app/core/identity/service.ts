import { BaseService } from '../../../framework/core/service';
import { Identity } from '../../../models/identity';
import { EntityUtils } from '../../../framework/entity';
import { Principal } from '../../../models/principal';
import { AuthenticateResponse } from '../../../models/authenticateResponse';

export class IdentityService extends BaseService<Principal> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Principal, endpoint + 'auth/identity');
    }

    authenticate(username: string, password: string) {
        return this.call(fetch(`${this.endpoint}/${username}/${password}`, this.createGetFetchOptions()))
            .then(this.asJson)
            .then(x => EntityUtils.assign(x, Principal));
    }
    
    getIdentity() {
        return this.call(fetch(`${this.endpoint}/get`, this.createGetFetchOptions()))
            .then(this.asJson)
            .then(x => EntityUtils.assign(x, AuthenticateResponse));
    }
}