import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Movie, MovieDocument } from "../../entities/movie.entity";

@Injectable()
class MoviesRepository {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>
  ) {}

  async create(movie: Movie): Promise<MovieDocument> {
    return this.movieModel.create(movie);
  }

  async getAmount(): Promise<number> {
    return this.movieModel.collection.countDocuments();
  }
}

export default MoviesRepository;
