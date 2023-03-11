import { EntityMetadata } from './metadata';
import { EntityState } from './state';
import { Validation } from './validation';
// import i18n from '../i18n';

export abstract class Entity {

    private __metadata: EntityMetadata;
    private __state: EntityState;
    private __validation: Validation<Entity>;

    // [k: string]: any;

    //constructor(data?: any) {
    constructor(data?: any) {
        this.__metadata = EntityMetadata.forTarget(this.constructor);

        // this.init(data);
        this.__state = new EntityState(this, this.__metadata)
        // this.__state.init(data);

        this.__validation = new Validation(this, this.__metadata);        
    }

    init(data?: any) {

        this.__state.init(data);   
    }
}