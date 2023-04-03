export interface IDay {
  readonly date: string;
  readonly holiday: string | null;
}

export interface Holidays {
  date: string;
  localName: string;
}

export type ICalendar = IDay[][];
