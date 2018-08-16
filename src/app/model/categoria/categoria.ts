export class Categoria {
    
    private idCategoria: Number;    
    private dsCategoria: string;    
    private idUsuario: Number;    
    private fgAtivo: boolean;    
    private dtCadastro: Date;    
    private dtAlteracao: Date;    
    private tpCategoria: string;
    

    public get getIdCategoria(): Number {
        return this.idCategoria;
    }
    public set setIdCategoria(value: Number) {
        this.idCategoria = value;
    }

    public get getDsCategoria(): string {
        return this.dsCategoria;
    }
    public set setDsCategoria(value: string) {
        this.dsCategoria = value;
    }

    public get getIdUsuario(): Number {
        return this.idUsuario;
    }
    public set setIdUsuario(value: Number) {
        this.idUsuario = value;
    }

    public get getFgAtivo(): boolean {
        return this.fgAtivo;
    }
    public set setFgAtivo(value: boolean) {
        this.fgAtivo = value;
    }

    public get getDtCadastro(): Date {
        return this.dtCadastro;
    }
    public set setDtCadastro(value: Date) {
        this.dtCadastro = value;
    }

    public get getDtAlteracao(): Date {
        return this.dtAlteracao;
    }
    public set setDtAlteracao(value: Date) {
        this.dtAlteracao = value;
    }

    public get getTpCategoria(): string {
        return this.tpCategoria;
    }
    public set setTpCategoria(value: string) {
        this.tpCategoria = value;
    }

}
