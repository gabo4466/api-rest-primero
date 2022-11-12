import { Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsIn,
    IsInt,
    IsPositive,
    IsString,
    Min,
    MinLength,
} from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @MinLength(1)
    name: string;
    @IsString()
    @MinLength(1)
    synopsis: string;
    @Type(() => Date)
    @IsDate()
    releaseDate: Date;
    @IsArray()
    @IsIn(
        [
            'Action',
            'Adventure',
            'Drama',
            'Romance',
            'Horror',
            'Suspense',
            'Comedy',
        ],
        { each: true },
    )
    genre: string[];
    @IsInt()
    @IsPositive()
    @Min(1)
    rating: number;
    @IsString()
    director: string;
    @IsString()
    mainActor: string;
    @IsInt()
    @IsPositive()
    @Min(40)
    duration: number;
}
