import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private readonly logger = new Logger('MoviesService');
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async create(createMovieDto: CreateMovieDto /*, i18n: I18nContext*/) {
        try {
            const movie = await this.movieRepository.create(createMovieDto);
            await this.movieRepository.save(movie);
            return movie;
        } catch (error) {
            this.exceptionHandler(error);
        }
    }

    async findAll() {
        const movies = await this.movieRepository.find();
        return movies;
    }

    findOne(id: number) {
        return `This action returns a #${id} movie`;
    }

    async update(id: string, updateMovieDto: UpdateMovieDto) {
        const movie = await this.movieRepository.preload({
            id: id,
            ...updateMovieDto,
        });

        if (!movie) {
            throw new NotFoundException(`La película no se ha encontrado`);
        }

        try {
            await this.movieRepository.save(movie);
            return movie;
        } catch (error) {
            this.exceptionHandler(error);
        }
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }

    private exceptionHandler(error) {
        this.logger.error(error);
        if (error.code === '23505') {
            throw new BadRequestException({
                errorCode: '23505',
                details: error.detail,
            });
        } else {
            throw new InternalServerErrorException(
                'No se ha podido procesar la petición',
            );
        }
    }
}
