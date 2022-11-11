import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async create(createMovieDto: CreateMovieDto) {
        try {
            const movie = await this.movieRepository.create(createMovieDto);
            await this.movieRepository.save(movie);
            return movie;
        } catch (error) {
            console.log(error);
        }
    }

    findAll() {
        return `This action returns all movies`;
    }

    findOne(id: number) {
        return `This action returns a #${id} movie`;
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return `This action updates a #${id} movie`;
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }
}
