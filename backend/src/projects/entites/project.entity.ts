import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HistoryEntity } from './history.entity';

export enum ProjectType {
  Text = 'TEXT',
  CSV = 'CSV',
}

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fileUrl: string;

  @Column()
  type: ProjectType;

  @OneToMany(() => HistoryEntity, (history) => history.project)
  history: HistoryEntity[];
}
