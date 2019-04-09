import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";
import { FiltroDespesaAgendamentoHeader } from "./filtro/filtro-despesa-agendamento-header";
import { Conta } from "../conta/conta";

export class DespesaAgendamentoHeader {
    
    idDespesaAgh: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    idConta: Number;
    dtInicio: Date;
    vlDespesaAgh: Number;
    strVlDespesaAgh: string;
    nrParcelas: Number;
    idUsuario: Number;
    fgAtivo: boolean;    
    dtCadastro: Date;    
    dtAlteracao: Date;
    dsObservacao: String;
    idPeriodoAgh: Number;

    categoria: Categoria;
    subcategoria: Subcategoria;
    conta: Conta;

    filtro: FiltroDespesaAgendamentoHeader;
    
}
