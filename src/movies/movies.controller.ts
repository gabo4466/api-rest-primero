import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

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
    findAll() {
        return this.moviesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMovieDto: UpdateMovieDto,
    ) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moviesService.remove(+id);
    }
}
