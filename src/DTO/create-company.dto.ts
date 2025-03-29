import { MetaData } from "../Common/common.interfaces";

export interface CreateCompanyDto {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly category: string;
  readonly quantity: number;
  readonly inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  readonly rating: number;
  readonly created: MetaData;
  readonly updated: MetaData;
}
