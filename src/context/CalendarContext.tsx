import React, { PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useDate } from './DateContext';
import { ICalendar, IDay } from '../core/interface/calendar';
import { Calendar } from '../core/entities/calendar';

const CalendarContext = React.createContext<ICalendar>([]);

export const useCalendar = (): IDay[][] => useContext(CalendarContext);

export const CalendarContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const calendarController = useMemo(() => new Calendar(), []);
  const { year } = useDate();
  const [data, setData] = useState<ICalendar>(calendarController.build(year));

  useEffect(() => {
    const data = calendarController.build(year);
    setData(data);
  }, [year]);

  return <CalendarContext.Provider value={data}>{children}</CalendarContext.Provider>;
};
