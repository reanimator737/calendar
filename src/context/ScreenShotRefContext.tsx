import React, { PropsWithChildren, useContext, useRef } from 'react';

interface IScreenShotRefContext {
  calendarRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const ScreenShotRefContext = React.createContext<IScreenShotRefContext>({
  calendarRef: { current: null },
});

export const useScreenShotRef = (): IScreenShotRefContext => useContext(ScreenShotRefContext);

export const ScreenShotRefProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  return <ScreenShotRefContext.Provider value={{ calendarRef }}>{children}</ScreenShotRefContext.Provider>;
};
