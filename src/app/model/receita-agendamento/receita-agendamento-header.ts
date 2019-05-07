import { Categoria } from "../categoria/categoria";
import { Conta } from "../conta/conta";
import { Subcategoria } from "../subcategoria/subcategoria";
import { FiltroReceitaAgendamentoHeader } from "./filtro/filtro-receita-agendamento-header";

export class ReceitaAgendamentoHeader {
    
    idReceitaAgh: Number;
    idCategoria: Number;
    idSubcategoria: Number;
    idConta: Number;
    dtInicio: Date;
    vlReceitaAgh: Number;
    strVlReceitaAgh: string;
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

    filtro: FiltroReceitaAgendamentoHeader;
    
}
