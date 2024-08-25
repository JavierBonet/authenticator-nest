import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Manufacturer, Specs } from "../../../types";

@Schema()
export class Product {
  @Prop()
  name!: string;

  @Prop({ type: Object })
  manufacturer!: Manufacturer;

  @Prop()
  category!: string;

  @Prop()
  description!: string;

  @Prop({ type: Object })
  specs!: Specs;

  @Prop()
  usage_tips!: string[];
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
