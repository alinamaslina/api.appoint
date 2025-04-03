import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "../Controllers/users.controller";
import { UserSchema, UsersDataClass } from "../Schemas/users.schema";
import { UsersService } from "../Services/users.service";
import { AuthDataClass, AuthSchema } from "../Schemas/auth.schema";
import {AuthModule} from "./auth.module";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: UsersDataClass.name, schema: UserSchema },
      { name: AuthDataClass.name, schema: AuthSchema },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
