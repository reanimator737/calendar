import React, { useEffect, useMemo, useState } from 'react';
import { Calendar } from './core/entities/calendar';
import { DateContextWrapper } from './context/DateContext';
import { CalendarContextWrapper } from './context/CalendarContext';
import { ModalWindowControlProvider } from './context/modalWindowController';
import { LabelsContextWrapper } from './context/LabelsContext';
import { ScreenShotRefProvider } from './context/ScreenShotRefContext';
import { Loader } from './components/base/loader';
import { EventsContextWrapper } from './context/EventsController';
import { FiltersContextWrapper } from './context/FiltersContext';
import { Template } from './components/template';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calendarController = useMemo(() => new Calendar(), []);
  useEffect(() => {
    calendarController.getData().then(() => setIsLoading(false));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DateContextWrapper>
      <LabelsContextWrapper>
        <EventsContextWrapper>
          <CalendarContextWrapper>
            <ScreenShotRefProvider>
              <ModalWindowControlProvider>
                <FiltersContextWrapper>
                  <Template />
                </FiltersContextWrapper>
              </ModalWindowControlProvider>
            </ScreenShotRefProvider>
          </CalendarContextWrapper>
        </EventsContextWrapper>
      </LabelsContextWrapper>
    </DateContextWrapper>
  );
}

export default App;
