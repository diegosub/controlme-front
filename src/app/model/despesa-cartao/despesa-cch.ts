import { FiltroDespesaCartao } from "./filtro/filtro-despesa-cartao";
import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";
import { Conta } from "../conta/conta";

export class DespesaCch {
    
    idDespesaCch: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    idCartao: Number;
    vlDespesa: Number;
    strVlDespesa: string;
    dtDespesa: Date;
    dsObservacao: string;
    nrParcelas: Number;
    idUsuario: Number;
    fgAtivo: boolean;    
    dtCadastro: Date;    
    dtAlteracao: Date;

    categoria: Categoria;
    subcategoria: Subcategoria;
    conta: Conta;

    filtro: FiltroDespesaCartao;

}
