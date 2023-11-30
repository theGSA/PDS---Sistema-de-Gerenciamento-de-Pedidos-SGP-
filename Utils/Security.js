const {createHash} = require('crypto');

class Security {
    static secret =  "x-m7~wxx%-|)+OtGGi[wx@w(4.U|L8oUttAx|hIb%t8'.ec64rnshg-H5][{Ew:";//Não modificar. Caso contrário, todos os usuários deverão alterar a senha
    static CreateSecurity(usuario, password){
        return createHash('sha256').update(`${Security.secret}${usuario}${password}`).digest('hex');
    }
}

module.exports = Security;