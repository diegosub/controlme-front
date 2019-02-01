import { Categoria } from "../categoria/categoria";
import { Subcategoria } from "../subcategoria/subcategoria";
import { FiltroDespesaAgendamentoHeader } from "./filtro/filtro-despesa-agendamento-header";

export class DespesaAgendamentoHeader {
    
    idDespesaAgh: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    dtInicio: Date;
    vlDespesaAgh: Number;
    strVlDespesaAgh: string;
    tpDespesaAgh: string;
    nrParcelas: Number;
    idUsuario: Number;
    fgAtivo: boolean;    
    dtCadastro: Date;    
    dtAlteracao: Date;
    dsObservacao: String;
    idPeriodo: Number;
    nrPeriodo: Number;

    categoria: Categoria;
    subcategoria: Subcategoria;

    filtro: FiltroDespesaAgendamentoHeader;
    
}
