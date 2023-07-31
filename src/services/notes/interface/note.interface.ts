export interface INote {
  id: string;
  name: string;
  created: string;
  category: string;
  content: string;
  dates: string;
  archive: boolean;
}

export interface IStatsNotes {
  category: string;
  active: number;
  archive: number;
}
