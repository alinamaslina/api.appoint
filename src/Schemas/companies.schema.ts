import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

export type CompanyDocument = HydratedDocument<CompanyDataClass>;

@Schema({ collection: "companies", timestamps: false })
export class CompanyDataClass {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({
    required: true,
    enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']
  })
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

  @Prop({ required: true })
  rating: number;

  @Prop({ type: MetaDataSchema, required: true })
  created: MetaData;

  @Prop({ type: MetaDataSchema, required: true })
  updated: MetaData;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyDataClass);