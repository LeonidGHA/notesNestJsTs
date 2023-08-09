export interface INote {
  id: string;
  name: string;
  createdAt: string;
  category: string;
  content: string;
  dates: string;
  archive: boolean;
  updatedAt: string;
}

export interface IStatsNotes {
  category: string;
  active: number;
  archive: number;
}
