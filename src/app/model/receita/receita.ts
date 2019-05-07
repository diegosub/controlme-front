import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";
import { Conta } from "../conta/conta";
import { FiltroReceita } from "./filtro/filtro-receita";

export class Receita {
    
    idReceita: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    idConta: Number;
    vlReceita: Number;
    dtReceita: Date;
    dsObservacao: string;
    idUsuario: Number;
    fgAtivo: boolean;    
    dtCadastro: Date;    
    dtAlteracao: Date;

    categoria: Categoria;
    subcategoria: Subcategoria;
    conta: Conta;

    filtro: FiltroReceita;

}
