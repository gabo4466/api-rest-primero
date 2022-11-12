import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';
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
            this.logger.error(error);
            throw new InternalServerErrorException(
                'No se ha podido procesar la petición',
            );
            /*i18n.t('messages.INTERNALSERVERERROR')*/
        }
    }

    async findAll() {
        const movies = await this.movieRepository.find();
        return movies;
    }

    async findOne(term: string) {
        let movie: Movie;

        if (isUUID(term)) {
            movie = await this.movieRepository.findOneBy({ id: term });
        } else {
            const queryBuilder = this.movieRepository.createQueryBuilder();
            movie = await queryBuilder
                .where(`name=:name or slug=:slug `, {
                    name: term,
                    slug: term,
                })
                .getOne();
        }

        if (!movie) {
            throw new NotFoundException(`Pelicula no encontrada`);
        }
        return movie;
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
            this.logger.error(error);
            throw new InternalServerErrorException(
                'No se ha podido procesar la petición',
            );
        }
    }

    async remove(id: string) {
        const movie = await this.movieRepository.findOneBy({ id: id });

        if (!movie) {
            throw new NotFoundException(`Pelicula no encontrada`);
        } else {
            await this.movieRepository.remove(movie);
        }

        return;
    }
}
