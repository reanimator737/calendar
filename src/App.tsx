import React, { useEffect, useMemo, useState } from 'react';
import { Calendar } from './entities/calendar';
import { DateContextWrapper } from './components/context/DateContext';
import { CalendarContextWrapper } from './components/context/CalendarContext';
import { ModalWindowControlProvider } from './components/context/modalWindowController';
import { LabelsContextWrapper } from './components/context/LabelsContext';
import { ScreenShotRefProvider } from './components/context/ScreenShotRefContext';
import { Loader } from './components/base/loader';
import { EventsContextWrapper } from './components/context/EventsController';
import { FiltersContextWrapper } from './components/context/FiltersContext';
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
