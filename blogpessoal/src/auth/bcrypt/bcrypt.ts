import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt' // utilizar a biblioteca bcrypt

@ Injectable ()
export class Bcrypt {

    async criptografarSenha (senha: string): Promise<string> {

        let saltos = 10;   // rodar um rash com 10 saltos (saltos= caracteres aleatorios)
        return await bcrypt.hash(senha, saltos); // 
    }

    async compararSenhas (senhaBanco: string, senhaDigitada: string): Promise<boolean> {
        return bcrypt.compareSync(senhaDigitada, senhaBanco);
    }
}

