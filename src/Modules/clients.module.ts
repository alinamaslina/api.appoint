import {Module} from "@nestjs/common";
import {ScheduleModule} from '@nestjs/schedule';
import {MongooseModule} from "@nestjs/mongoose";
import {ClientsController} from "../Controllers/clients.controller";
import {ClientSchema, ClientsDataClass} from "../Schemas/clients.schema";
import {ClientsService} from "../Services/clients.service";
import {UsersModule} from "./users.module";
import {HttpModule} from "@nestjs/axios";
import {LogsService} from "../Services/logs.service";
import {LogDataClass, LogSchema} from "../Schemas/log.schema";
import {AuthDataClass, AuthSchema} from "../Schemas/auth.schema";
import {AuthModule} from "./auth.module";


@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: ClientsDataClass.name, schema: ClientSchema },
      { name: AuthDataClass.name, schema: AuthSchema },
      { name: LogDataClass.name, schema: LogSchema }]),
    HttpModule,
    ScheduleModule.forRoot()
  ],
  controllers: [ClientsController],
  providers: [ClientsService, LogsService],
  exports: [ClientsService],
})
export class ClientsModule {}
