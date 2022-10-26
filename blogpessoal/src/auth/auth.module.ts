import { Module } from "@nestjs/common";
import { UsuarioModule } from "../usuario/usuario.module";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./service/auth.service";
import { localStrategy } from "./strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";



@Module ({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '24h'},
        }),
    ],
    providers: [Bcrypt, AuthService, localStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})

export class AuthModule {}