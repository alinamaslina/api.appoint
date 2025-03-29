import { Module } from "@nestjs/common";
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from "@nestjs/mongoose";
import { CompaniesController } from "../Controllers/companies.controller";
import { CompanySchema, CompanyDataClass } from "../Schemas/companies.schema";
import { CompaniesService } from "../Services/companies.service";
import { UsersModule } from "./users.module";
import { HttpModule } from "@nestjs/axios";
import { LogsService } from "../Services/logs.service";
import { LogDataClass, LogSchema } from "../Schemas/log.schema";


@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: CompanyDataClass.name, schema: CompanySchema },
      { name: LogDataClass.name, schema: LogSchema }
    ]),
    HttpModule,
    ScheduleModule.forRoot()
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, LogsService],
})
export class CompaniesModule {}
