import deepClone from 'lodash.clonedeep';
import { findAllArrays, parseDateToNumbers } from '../helpers';
import { IEvent, IEventList } from '../interface/events';
import { DnDActionProps } from '../interface/extra';
import { ILabel } from '../interface/labels';

export class Event implements IEvent {
  labels: ILabel[];
  readonly id: number;
  date: string;
  value: string;

  constructor({ labels, id, date, value }: IEvent) {
    this.date = date;
    this.labels = labels;
    this.id = id;
    this.value = value;
  }
}

export class EventsFab {
  private counter: number;
  private list: IEventList;
  private static instance: EventsFab;

  constructor() {
    this.counter = 0;
    this.list = { counter: this.counter };
    if (typeof EventsFab.instance === 'object') {
      return EventsFab.instance;
    } else {
      EventsFab.instance = this;
      return this;
    }
  }

  get List() {
    return deepClone(this.list);
  }

  generateNewEvent(labels: ILabel[], value: string, date: string) {
    const event = new Event({ labels, value, date, id: this.counter++ });
    const [year, month, day] = parseDateToNumbers(date);
    const clone = deepClone(this.list);
    clone[year] ??= {};
    clone[year][month] ??= {};
    clone[year][month][day] ??= [];
    clone[year][month][day].push(event);
    clone.counter += 1;
    return (this.list = clone);
  }

  deleteEvent(event: IEvent) {
    const clone = deepClone(this.list);
    const [year, month, day] = parseDateToNumbers(event.date);
    const events = clone[year][month][day];
    const index = events.findIndex((el) => el.id === event.id);
    events.splice(index, 1);
    this.list = clone;
    return this.list;
  }

  updateEvent(prevState: IEvent, newState: Omit<IEvent, 'id'>) {
    const clone = deepClone(this.list);
    const [fromYear, fromMonth, fromDay] = parseDateToNumbers(prevState.date);
    const eventsFrom = clone[fromYear][fromMonth][fromDay];
    const index = eventsFrom.findIndex((el) => el.id === prevState.id);
    if (prevState.date !== newState.date) {
      eventsFrom.splice(index, 1);
      const [toYear, toMonth, toDay] = parseDateToNumbers(newState.date);
      clone[toYear] ??= {};
      clone[toYear][toMonth] ??= {};
      clone[toYear][toMonth][toDay] ??= [];
      clone[toYear][toMonth][toDay].push({
        id: prevState.id,
        date: newState.date,
        labels: newState.labels,
        value: newState.value,
      });
    } else {
      const event = eventsFrom[index];
      event.value = newState.value;
      event.labels = newState.labels;
    }

    return (this.list = clone);
  }

  eventDragAndDrop({ source, destination }: DnDActionProps) {
    const clone = deepClone(this.list);
    const [fromYear, fromMonth, fromDay] = parseDateToNumbers(source.droppableId);
    let eventsFrom = clone[fromYear][fromMonth][fromDay];
    const [event] = eventsFrom.splice(source.index, 1);
    event.date = destination.droppableId;

    const [toYear, toMonth, toDay] = parseDateToNumbers(destination.droppableId);

    if (clone?.[toYear]?.[toMonth]?.[toDay]) {
      let eventsTo = clone[toYear][toMonth][toDay];
      eventsTo.splice(destination.index, 0, event);
      return (this.list = clone);
    }
    clone[toYear] ??= {};
    clone[toYear][toMonth] ??= {};
    clone[toYear][toMonth][toDay] ??= [];
    clone[toYear][toMonth][toDay].push(event);

    return (this.list = clone);
  }

  removeLabelFromList(id: number) {
    const events = findAllArrays<IEventList, IEvent>(this.list);
    const filteredEvents = events.filter((event) => event.labels.map((label) => label.id === id));
    if (!filteredEvents) {
      return this.list;
    }
    const clone = deepClone(this.list);
    filteredEvents.forEach(({ date }) => {
      const [year, month, day] = parseDateToNumbers(date);
      clone[year][month][day].forEach((event) => {
        event.labels = event.labels.filter((el) => el.id !== id);
      });
    });
    return (this.list = clone);
  }

  updateList(label: ILabel) {
    const events = findAllArrays<IEventList, IEvent>(this.list);
    if (!events.length) {
      return this.list;
    }

    const clone = deepClone(this.list);

    events.forEach((event) => {
      const index = event.labels.findIndex(({ id }) => id === label.id);
      event.labels.splice(index, 1, label);
      const [year, month, day] = parseDateToNumbers(event.date);
      const indexInClone = clone[year][month][day].findIndex((ev) => ev.id === event.id);
      clone[year][month][day][indexInClone] = event;
    });

    return (this.list = clone);
  }

  setDataFromJSON(data: IEventList) {
    data.counter++;
    return (this.list = data);
  }
}
