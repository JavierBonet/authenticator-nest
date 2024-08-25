import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "programming-languages" })
export class ProgrammingLanguage {
  @Prop()
  name!: string;

  @Prop()
  developer!: string;

  @Prop()
  first_appeared!: number;

  @Prop()
  paradigm!: string[];

  @Prop()
  typing_discipline!: string;

  @Prop()
  usage!: string[];
}

export type ProgrammingLanguageDocument = HydratedDocument<ProgrammingLanguage>;

export const ProgrammingLanguageSchema =
  SchemaFactory.createForClass(ProgrammingLanguage);
