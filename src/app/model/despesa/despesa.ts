import { FiltroDespesa } from "./filtro/filtro-despesa";
import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";
import { Conta } from "../conta/conta";

export class Despesa {
    
    idDespesa: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    idConta: Number;
    vlDespesa: Number;
    strVlDespesa: string;
    dtDespesa: Date;
    dsObservacao: string;
    idUsuario: Number;
    fgAtivo: boolean;    
    dtCadastro: Date;    
    dtAlteracao: Date;

    categoria: Categoria;
    subcategoria: Subcategoria;
    conta: Conta;

    filtro: FiltroDespesa;

}
