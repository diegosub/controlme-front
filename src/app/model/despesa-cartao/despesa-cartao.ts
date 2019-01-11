import { FiltroDespesaCartao } from "./filtro/filtro-despesa-cartao";
import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";
import { Conta } from "../conta/conta";

export class DespesaCartao {
    
    idDespesaCartao: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    idCartao: Number;
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

    filtro: FiltroDespesaCartao;

}
