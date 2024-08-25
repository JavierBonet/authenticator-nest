import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CastEntity, Director, LocationsEntity } from "../../../types";

@Schema()
export class Movie {
  @Prop()
  title!: string;

  @Prop({ type: Object })
  director!: Director;

  @Prop()
  year!: number;

  @Prop()
  genre!: string[];

  @Prop()
  rating!: number;

  @Prop()
  cast!: CastEntity[];

  @Prop()
  plot_summary!: string;

  @Prop()
  locations!: LocationsEntity[];
}

export type MovieDocument = HydratedDocument<Movie>;

export const MovieSchema = SchemaFactory.createForClass(Movie);
