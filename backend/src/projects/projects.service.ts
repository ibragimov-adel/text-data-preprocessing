import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { Repository } from 'typeorm';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity, ProjectType } from './entites/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryEntity } from './entites/history.entity';
import { HttpService } from '@nestjs/axios';
import { PreprocessDto } from './dto/preprocess.dto';
import { extname, join } from 'path';
import * as fs from 'fs';

const DATA_HANDLING_SERVER_URL = 'http://127.0.0.1:5000';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
    private readonly httpService: HttpService,
  ) {}

  getAll() {
    return this.projectsRepository.find({ relations: ['history'] });
  }

  getById(id: number) {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['history'],
    });
  }

  create(file: Express.Multer.File, dto: CreateProjectDto) {
    const project = new ProjectEntity();

    let projectType: ProjectType | undefined;
    switch (file.mimetype) {
      case 'text/csv':
        projectType = ProjectType.CSV;
      case 'text/plain':
        projectType = ProjectType.Text;
    }

    if (!projectType) {
      throw new BadRequestException();
    }

    project.name = dto.name;
    project.fileUrl = file.filename;
    project.type = projectType;

    return this.projectsRepository.save(project);
  }

  async startPreprocessing(id: number, dto: PreprocessDto) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException();
    }

    const filename = project.fileUrl;
    const filePath = `uploads/${filename}`;

    const formData = new FormData();
    formData.append('file', createReadStream(filePath), {
      filename,
      contentType: 'text/plain',
    });
    formData.append('file', readFileSync(filePath));
    dto.removePunctuation &&
      formData.append('remove_punctuation', String(dto.removePunctuation));
    dto.removeWhitespace &&
      formData.append('remove_whitespace', String(dto.removeWhitespace));
    dto.lowercase && formData.append('lowercase', String(dto.lowercase));
    dto.splitSentences &&
      formData.append('split_sentences', String(dto.splitSentences));
    dto.sentencesSeparator &&
      formData.append('sentences_separator', String(dto.sentencesSeparator));
    dto.lemmatization &&
      formData.append('lemmatize', String(dto.lemmatization));
    dto.removeStopwords &&
      formData.append('remove_stopwords', String(dto.removeStopwords));
    dto.stopwords && formData.append('stopwords', String(dto.stopwords));
    dto.useDefaultStopwordsList &&
      formData.append(
        'use_default_stopwords_list',
        String(dto.useDefaultStopwordsList),
      );

    const { data: response } = await firstValueFrom(
      this.httpService.post(
        `${DATA_HANDLING_SERVER_URL}/preprocess`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'blob',
          maxContentLength: 1024 * 1024 * 1000,
        },
      ),
    );

    const randomName = Array(10)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const resultFileName = `${randomName}${extname(filename)}`;
    const resultFilePath = `uploads/${resultFileName}`;
    fs.writeFileSync(resultFilePath, response);

    const history = new HistoryEntity();
    history.fileUrl = resultFileName;
    history.project = project;

    return this.historyRepository.save(history);
  }

  async getHistoryFileById(id: number) {
    const foundHistory = await this.historyRepository.findOneBy({ id });

    if (!foundHistory) {
      throw new NotFoundException();
    }

    const file = createReadStream(
      join(process.cwd(), 'uploads', foundHistory.fileUrl),
    );

    return new StreamableFile(file);
  }
}
