import { Module } from "@nestjs/common";
import { ClientsModule } from './Modules/clients.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./Modules/auth.module";
import { UsersModule } from "./Modules/users.module";
import { CompaniesModule } from "./Modules/companies.module";


require("dotenv").config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_KEY),
    AuthModule,
    UsersModule,
    ClientsModule,
    CompaniesModule,
  ],
  providers: [],
})
export class AppModule {}
