import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PreprocessDto {
  @IsBoolean()
  @IsOptional()
  removePunctuation?: boolean;

  @IsBoolean()
  @IsOptional()
  removeWhitespace?: boolean;

  @IsBoolean()
  @IsOptional()
  lowercase?: boolean;

  @IsBoolean()
  @IsOptional()
  splitSentences?: boolean;

  @IsString()
  @IsOptional()
  sentencesSeparator?: string;

  @IsBoolean()
  @IsOptional()
  lemmatization?: boolean;

  @IsBoolean()
  @IsOptional()
  removeStopwords?: boolean;

  @IsString()
  @IsOptional()
  stopwords?: string;

  @IsBoolean()
  @IsOptional()
  useDefaultStopwordsList?: boolean;
}
