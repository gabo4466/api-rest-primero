import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [MoviesModule, ConfigModule.forRoot(), CommonModule],
})
export class AppModule {}
