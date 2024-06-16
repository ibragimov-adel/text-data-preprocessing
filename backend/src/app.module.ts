import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ProjectsModule } from './projects/projects.module';
import { ProjectEntity } from './projects/entites/project.entity';
import { HistoryEntity } from './projects/entites/history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ProjectEntity, HistoryEntity],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
