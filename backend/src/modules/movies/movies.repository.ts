import { Injectable } from "@nestjs/common";
import { Movie, MovieDocument } from "../../db/entities/movie.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
class MoviesRepository {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>
  ) {}

  async getAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }
}

export default MoviesRepository;
