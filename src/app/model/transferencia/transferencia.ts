import { Conta } from "../conta/conta";
import { FiltroTransferencia } from "./filtro/filtro-transferencia";

export class Transferencia {
    
    idTransferencia: Number;
    idTransferenciaFixa: Number;
    idUsuario: Number;
    idContaOrigem: Number;
    idContaDestino: Number;  
    vlTransferencia: Number;   
    strVlTransferencia: Number; 
    dtCadastro: Date;
    dtAlteracao: Date;
    dtTransferencia: String;
    nrDia: Number;
    fgAtivo: boolean;
    fgTransferenciaFixa: boolean;
    dsObservacao: string;

    contaOrigem: Conta;
    contaDestino: Conta;

    filtro: FiltroTransferencia;

}
