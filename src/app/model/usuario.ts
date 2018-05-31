export class Usuario {
    constructor(
        public idUsuario: Number,
        public dsNome: string,
        public dsEmail: string,
        public dsSenha: string,
        public dsConfirmarSenha: string,       
        public dsPerfil: string
    ){}
}
