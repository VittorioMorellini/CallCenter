import { Entity, field } from "../framework/entity"

export class AuthenticateResponse extends Entity {
    @field()
    id: number 
    @field()
    name: string 
    @field()
    surname: string  
    @field()
    username: string 
    @field()
    token: string
    
    constructor(data?: any) {
        super()
        this.init(data);      
    }
}