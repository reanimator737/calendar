import { ILabel } from './labels';

export interface IEvent {
  readonly id: number;
  value: string;
  date: string;
  labels: ILabel[];
}

export interface IEventList {
  counter: number;

  [year: number]: { [month: number]: { [day: number]: IEvent[] } };
}
