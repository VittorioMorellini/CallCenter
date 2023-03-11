import { Entity, resource, field, required } from '../framework/entity';

export class Identity extends Entity {

    // @field()
    // idPrincipal: number;
    // @field()
    // idPartizione: number;
    // @field()
    username: string;
    @field()
    role: string;
    // @field()
    // manager: boolean;
    // @field()
    // gestioneUtenti: boolean;
    // @field()
    // uploadAbilitato: boolean;
}

@resource('identity')
export class IdentitySearchModel extends Entity {

    // @association(IdentityAutorizzazione)
    // autorizzazioni: IdentityAutorizzazione[];

    // @field()
    // idPartizione: number;
    // @field()
    // idDivisione: number;
    // @field()
    // idDitta: number;

    // @field()
    // idEnte: number;

    // @field()
    // conservato: boolean;

    // @field()
    // gruppoServizi: string;
    // @field()
    // ditte: string;
}