import React, { MouseEvent, useCallback, useMemo } from 'react';
import { Container, DateInfo, DayOfWeek, EventsContainer, Holiday } from './style';
import { Event } from '../event';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { useEvents } from '../../context/EventsController';
import { IDay } from '../../core/interface/calendar';
import { getInfoFromDate, parseDateToNumbers } from '../../helpers';
import { useModalWindowController } from '../../context/modalWindowController';
import { SmallText } from '../base/text/style';

export const Card: React.FC<IDay & { provided: DroppableProvided; className?: string }> = ({
  date,
  holiday,
  provided,
  className,
}) => {
  const { eventCreate, setModalEventDate } = useModalWindowController();
  const { events } = useEvents();

  const { day, dayOfWeek, monthName } = useMemo(() => getInfoFromDate(date), [date]);

  const handleEvent = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        if (eventCreate.current !== null) {
          setModalEventDate(date);
          eventCreate.current?.open();
        }
      }
    },
    [date],
  );

  const eventsArray = useMemo(() => {
    const [year, month, day] = parseDateToNumbers(date);
    if (events[year] && events[year][month] && events[year][month][day]) {
      return events[year][month][day];
    } else {
      return [];
    }
  }, [events, date]);

  return (
    <Container onClick={handleEvent} ref={provided.innerRef} {...provided.droppableProps} className={className}>
      <DayOfWeek>{dayOfWeek}</DayOfWeek>
      <DateInfo>{`${day} ${monthName}`}</DateInfo>
      {holiday && (
        <Holiday>
          <SmallText>{holiday}</SmallText>
        </Holiday>
      )}
      <EventsContainer>
        {eventsArray.map((event, index) => (
          <Draggable draggableId={event.id.toString()} index={index} key={event.id}>
            {(provided) => <Event provided={provided} {...event} date={date} />}
          </Draggable>
        ))}
      </EventsContainer>
    </Container>
  );
};
