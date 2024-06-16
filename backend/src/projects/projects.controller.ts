import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { PreprocessDto } from './dto/preprocess.dto';

const uploadDiskStorage = diskStorage({
  destination: './uploads',
  filename: (_, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = Array(10)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${randomName}${fileExtName}`);
  },
});

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('/')
  getAll() {
    return this.projectsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.projectsService.getById(id);
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: uploadDiskStorage,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(file, createProjectDto);
  }

  @Post('/:id/preprocess')
  startPreprocessing(
    @Param('id') id: number,
    @Body() preprocessDto: PreprocessDto,
  ) {
    return this.projectsService.startPreprocessing(id, preprocessDto);
  }

  @Get(`/history/:id`)
  @Header('Content-Type', 'text/plain')
  @Header('Content-Disposition', 'attachment;')
  getHistoryById(@Param('id') id: number) {
    return this.projectsService.getHistoryFileById(id);
  }
}
