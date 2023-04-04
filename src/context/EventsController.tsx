import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { IEvent, IEventList } from '../core/interface/events';
import { DnDActionProps } from '../core/interface/extra';
import { EventsFab } from '../core/entities/events';
import { ILabel } from '../core/interface/labels';

interface IEventsContext {
  events: IEventList;
  removeLabelFromList: (id: number) => void;
  generateNewEvent: (labels: ILabel[], value: string, date: string) => void;
  eventDragAndDrop: ({ source, destination }: DnDActionProps) => void;
  updateEvent: (prevState: IEvent, newState: Omit<IEvent, 'id'>) => void;
  deleteEvent: (event: IEvent) => void;
  updateLabelList: (label: ILabel) => void;
  setDataFromJSON: (data: IEventList) => void;
}

const EventsContext = React.createContext<IEventsContext>({
  deleteEvent: () => undefined,
  events: { counter: Infinity },
  removeLabelFromList: () => undefined,
  updateLabelList: () => undefined,
  generateNewEvent: () => undefined,
  updateEvent: () => undefined,
  eventDragAndDrop: () => undefined,
  setDataFromJSON: () => undefined,
});

export const useEvents = (): IEventsContext => useContext(EventsContext);

export const EventsContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const controller = useMemo(() => new EventsFab(), []);
  const [events, setEvents] = useState<IEventList>(controller.List);
  const removeLabelFromList = useCallback((id: number) => {
    const newList = controller.removeLabelFromList(id);
    setEvents(newList);
  }, []);

  const updateEvent = useCallback((prevState: IEvent, newState: Omit<IEvent, 'id'>) => {
    const newList = controller.updateEvent(prevState, newState);
    setEvents(newList);
  }, []);

  const generateNewEvent = useCallback((labels: ILabel[], value: string, date: string) => {
    const newList = controller.generateNewEvent(labels, value, date);
    setEvents(newList);
  }, []);

  const eventDragAndDrop = useCallback(({ source, destination }: DnDActionProps) => {
    const newList = controller.eventDragAndDrop({ source, destination });
    setEvents(newList);
  }, []);

  const deleteEvent = useCallback((event: IEvent) => {
    const newList = controller.deleteEvent(event);
    setEvents(newList);
  }, []);

  const setDataFromJSON = useCallback((data: IEventList) => {
    const newList = controller.setDataFromJSON(data);
    setEvents(newList);
  }, []);

  const updateLabelList = useCallback((label: ILabel) => {
    const newList = controller.updateList(label);
    setEvents(newList);
  }, []);

  return (
    <EventsContext.Provider
      value={{
        updateLabelList,
        removeLabelFromList,
        events,
        updateEvent,
        generateNewEvent,
        eventDragAndDrop,
        deleteEvent,
        setDataFromJSON,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
