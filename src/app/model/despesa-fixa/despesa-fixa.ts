import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";

export class DespesaFixa {
    
    idDespesaFixa: Number;
    dsDespesaFixa: string;
    nrDiaVencimento: number;
    vlDespesa: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    dsObservacao: string;
    idUsuario: Number;
    fgAtivo: boolean;    
    dtCadastro: Date;    
    dtAlteracao: Date;

    categoria: Categoria;
    subcategoria: Subcategoria;

}
