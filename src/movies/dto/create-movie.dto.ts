import {
    IsArray,
    IsDate,
    IsInt,
    IsPositive,
    IsString,
    Min,
    MinLength,
} from 'class-validator';

export class CreateMovieDto {
    @IsInt()
    id: string;
    @IsString()
    @MinLength(1)
    name: string;
    @IsString()
    synopsis: string;
    @IsDate()
    releaseDate: Date;
    @IsString({ each: true })
    @IsArray()
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
