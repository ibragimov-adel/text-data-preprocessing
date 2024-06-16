export enum ProjectTypeEnum {
  Text = 'TXT',
  CSV = 'CSV',
}

export type ProjectHistoryType = {
  id: number;
  fileUrl: string;
  date: Date;
};

export type ProjectType = {
  id: number;
  name: string;
  fileUrl: string;
  type: ProjectTypeEnum;

  history: ProjectHistoryType[];
};
