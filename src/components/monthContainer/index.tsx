import React, { useEffect, useState } from 'react';
import { Card } from '../card';
import { Container } from './style';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEvents } from '../context/EventsController';
import { useDate } from '../context/DateContext';
import { useCalendar } from '../context/CalendarContext';
import { useScreenShotRef } from '../context/ScreenShotRefContext';

export const MonthContainer: React.FC = () => {
  const { eventDragAndDrop } = useEvents();
  const calendar = useCalendar();
  const { month } = useDate();
  const { calendarRef } = useScreenShotRef();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  }, [calendar[month]]);

  const onDragDropContextDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (destination) {
      eventDragAndDrop({ source, destination });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragDropContextDragEnd}>
      <Container ref={calendarRef} animate={animate}>
        {calendar[month].map((cardData, index) => (
          <Droppable droppableId={cardData.date} key={cardData.date}>
            {(provided) => (
              <Card {...cardData} key={cardData.date} provided={provided} className={index < 7 ? 'firstRow' : ''} />
            )}
          </Droppable>
        ))}
      </Container>
    </DragDropContext>
  );
};
