import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Post()
    create(
        @Body() createMovieDto: CreateMovieDto /*@I18n() i18n: I18nContext*/,
    ) {
        return this.moviesService.create(createMovieDto /*i18n*/);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.moviesService.findAll(paginationDto);
    }

    @Get(':term')
    findOne(@Param('term') term: string) {
        return this.moviesService.findOne(term);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMovieDto: UpdateMovieDto,
    ) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.moviesService.remove(id);
    }
}
