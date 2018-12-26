import { FiltroDespesa } from "./filtro/filtro-despesa";

export class Despesa {
    
    idDespesa: Number;
    idCategoria: Number;    
    idSubcategoria: Number;
    idConta: Number;
    vlDespesa: Number;
    dtDespesa: Date;
    dsObservacao: string;
    idUsuario: Number;
    fgAtivo: boolean;    
    dtCadastro: Date;    
    dtAlteracao: Date;

    filtro: FiltroDespesa;

}
