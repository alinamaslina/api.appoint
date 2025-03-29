import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Put,
  Param,
} from "@nestjs/common";
import { LogsService } from "../Services/logs.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateCompanyDto } from "../DTO/create-company.dto";
import { CompanyDataClass } from "../Schemas/companies.schema";
import { CompaniesService } from "../Services/companies.service";

@ApiTags("Companies")
@Controller("companies")
export class CompaniesController {
  constructor(
      private readonly companiesService: CompaniesService,
      private readonly logsService: LogsService
  ) {}

  @Post()
  async create(
      @Body() createCompanyDto: CreateCompanyDto
  ): Promise<CompanyDataClass> {
    this.logsService.log({ method: "POST /companies" });
    return this.companiesService.create(createCompanyDto);
  }

  @Put(":id")
  async update(
      @Param("id") id: string,
      @Body() updateCompanyDto: CreateCompanyDto
  ): Promise<CompanyDataClass> {
    this.logsService.log({ method: `PUT /companies/${id}` });
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Patch(":id")
  async updatePartial(
      @Param("id") id: string,
      @Body() partialCompanyDto: Partial<CreateCompanyDto>
  ): Promise<CompanyDataClass> {
    this.logsService.log({ method: `PATCH /companies/${id}` });
    return this.companiesService.updatePartial(id, partialCompanyDto);
  }

  @Get()
  async findAll(): Promise<CompanyDataClass[]> {
    return this.companiesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CompanyDataClass> {
    return this.companiesService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<{ message: string }> {
    this.logsService.log({ method: `DELETE /companies/${id}` });
    return this.companiesService.delete(id);
  }
}