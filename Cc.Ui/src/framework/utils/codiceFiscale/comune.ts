import { normalizeString } from './utils'
export class Comune {
    nome: string;
    prov: string;
    cc: string;

  get nomeNorm () {
    return normalizeString(this.nome)
  }
  constructor (nome: string, prov: string, cc: string) {

      this.nome = nome
      this.prov = prov
      this.cc = cc
  }

  toJSON () {
    return {
      cc: this.cc,
      nome: this.nome,
      prov: this.prov
    }
  }
}