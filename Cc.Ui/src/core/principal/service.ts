import { BaseService } from '../../framework/core/service';
import { Principal } from '../../models';
import { PrincipalUpload, PrincipalUploadResult } from '../../models/principal';

export class PrincipalService extends BaseService<Principal> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Principal, endpoint + 'principal');
    }
    
    usernameExists(username: string) {
        return fetch(`${this.endpoint}/exists/${username}`, this.createGetFetchOptions())
            .then(this.asJson);
    }
    createUser(model: Principal) {
        return fetch(this.endpoint + '/user', this.createJsonFetchOptions('POST', model))
            .then(this.asItem(Principal));
    }

}