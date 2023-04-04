import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

interface IDateContext {
  month: number;
  year: number;
  setMonth: (id: number) => void;
  setYear: (id: number) => void;
  goBackForMonth: () => void;
  goForwardForMonth: () => void;
}

const DateContext = React.createContext<IDateContext>({
  month: 0,
  year: 0,
  setMonth: () => undefined,
  setYear: () => undefined,
  goBackForMonth: () => undefined,
  goForwardForMonth: () => undefined,
});

export const useDate = (): IDateContext => useContext(DateContext);

export const DateContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const now = useMemo(() => new Date(), []);
  const [month, setMonth] = useState<number>(now.getMonth());
  const [year, setYear] = useState<number>(now.getFullYear());

  const goBackForMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear((year) => year - 1);
    } else {
      setMonth((month) => month - 1);
    }
  }, [month, setYear]);

  const goForwardForMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear((year) => year + 1);
    } else {
      setMonth((month) => month + 1);
    }
  }, [month]);

  return (
    <DateContext.Provider value={{ month, setYear, setMonth, year, goBackForMonth, goForwardForMonth }}>
      {children}
    </DateContext.Provider>
  );
};
