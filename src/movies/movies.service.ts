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
import { PaginationDto } from '../common/dtos/pagination.dto';
import { skip } from 'rxjs';

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

    async findAll(paginationdto: PaginationDto) {
        const { limit = 0, offset = 0 } = paginationdto;
        const movies = await this.movieRepository.find({
            take: limit,
            skip: offset,
        });
        if (!movies) {
            throw new NotFoundException(
                `No se han encontrado películas registradas`,
            );
        }
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
            this.logger.error(error);
            throw new InternalServerErrorException(
                'No se ha podido procesar la petición',
            );
        }
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }
}
