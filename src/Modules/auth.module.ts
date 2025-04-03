import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "../Controllers/auth.controller";
import { AuthDataClass, AuthSchema } from "../Schemas/auth.schema";
import { AuthService } from "../Services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../Constants/auth.constants";
import { UsersModule } from "./users.module";
import {ClientSchema, ClientsDataClass} from "../Schemas/clients.schema";
import { UserSchema, UsersDataClass } from "../Schemas/users.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthDataClass.name, schema: AuthSchema },
    ]),
    MongooseModule.forFeature([
      { name: AuthDataClass.name, schema: AuthSchema },
      { name: ClientsDataClass.name, schema: ClientSchema },
      { name: UsersDataClass.name, schema: UserSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
