import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CompanyDataClass, CompanyDocument } from "../Schemas/companies.schema";
import { CreateCompanyDto } from "../DTO/create-company.dto";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });

@Injectable()
export class CompaniesService {
  constructor(
      @InjectModel(CompanyDataClass.name)
      private companiesModel: Model<CompanyDocument>
  ) {}

  async create(input: CreateCompanyDto): Promise<CompanyDataClass> {
    const id = generateId();
    const timestamp = {
      date: Date.now(),
      userId: null, // or omit this field if not needed
    };

    const createdCompany = new this.companiesModel({
      id,
      ...input,
      created: timestamp,
      updated: timestamp,
    });

    return createdCompany.save();
  }

  async update(id: string, input: CreateCompanyDto): Promise<CompanyDataClass> {
    const updated = {
      date: Date.now(),
      userId: null,
    };

    return this.companiesModel.findOneAndUpdate(
        { id },
        { ...input, updated },
        { new: true }
    );
  }

  async updatePartial(
      id: string,
      partial: Partial<CreateCompanyDto>
  ): Promise<CompanyDataClass> {
    const updated = {
      date: Date.now(),
      userId: null,
    };

    return this.companiesModel.findOneAndUpdate(
        { id },
        { ...partial, updated },
        { new: true }
    );
  }

  async findAll(): Promise<CompanyDataClass[]> {
    return this.companiesModel.find().exec();
  }

  async findOne(id: string): Promise<CompanyDataClass> {
    return this.companiesModel.findOne({ id }).exec();
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.companiesModel.deleteOne({ id }).exec();
    const message =
        result.deletedCount === 1
            ? "Company deleted successfully"
            : "Company not found";
    return { message };
  }
}