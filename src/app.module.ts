import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule, ConfigModule.forRoot()],
})
export class AppModule {}
