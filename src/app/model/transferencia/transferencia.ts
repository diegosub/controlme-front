import { Conta } from "../conta/conta";

export class Transferencia {
    
    idTransferencia: Number;    
    idUsuario: Number;    
    idContaOrigem: Number;
    idContaDestino: Number;  
    vlTransferencia: Number;   
    strVlTransferencia: Number; 
    dtCadastro: Date;    
    dtTransferencia: String;
    nrDia: Number;
    fgTipo: boolean; 
    fgTransferenciaFixa: boolean;
    dsObservacao: string;
    fgAtivo: boolean;

    contaOrigem: Conta;
    contaDestino: Conta;

}
