import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";

export class ReceitaFixa {
    
    idReceitaFixa: Number;
    dsReceitaFixa: string;
    nrDiaReceita: number;
    vlReceita: Number;
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
