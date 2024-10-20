import type { ObjectId } from "../../backend/node_modules/mongodb";
import { JwtPayload } from "jsonwebtoken";

export interface Movie {
  _id: ObjectId;
  title: string;
  director: Director;
  year: number;
  genre: string[];
  rating: number;
  cast: CastEntity[];
  plot_summary: string;
  locations: LocationsEntity[];
}

export interface Director {
  name: string;
  nationality: string;
  birth_year: number;
  previous_works: PreviousWorksEntity[];
}
interface PreviousWorksEntity {
  title: string;
  year: number;
}
export interface CastEntity {
  name: string;
  role: string;
  age: number;
  nationality: string;
}
export interface LocationsEntity {
  name: string;
  type: string;
  description: string;
}

export interface Product {
  _id: ObjectId;
  name: string;
  manufacturer: Manufacturer;
  category: string;
  description: string;
  specs: Specs;
  usage_tips: string[];
}

export interface Manufacturer {
  name: string;
  country: string;
  founded_year: number;
  products: ProductsEntity[];
}

type ProductsEntity = Record<string, string | undefined>;

export interface ProgrammingLanguage {
  name: string;
  developer: string;
  first_appeared: number;
  paradigm: string[];
  typing_discipline: string;
  usage: string[];
}

export type Specs = Record<string, string | string[] | undefined>;

export declare module JWT {
  export interface Payload extends JwtPayload {
    email: string;
    role: string;
  }
}
