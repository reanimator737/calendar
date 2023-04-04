import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CommonModal } from '../base/commonModal';
import { ButtonContainer, Container, DeleteText, LabelContainer } from './style';
import { BaseText, Header } from '../base/text/style';
import { Input } from '../base/inputs/style';
import { AcceptButton, Button, RejectButton } from '../base/buttons/style';
import { useLabels } from '../../context/LabelsContext';
import { PureLabelComponent } from '../base/label';
import { useEvents } from '../../context/EventsController';
import { IEvent } from '../../core/interface/events';
import { ILabel } from '../../core/interface/labels';
import { CommonModalProps } from '../../core/interface/extra';

export const EventCreate: React.FC<CommonModalProps & { eventDate: string }> = ({ modalRef, eventDate }) => {
  const { labels } = useLabels();
  const { generateNewEvent } = useEvents();
  const [error, setError] = useState({ date: false, value: false });

  const [inputValue, setInputValue] = useState<Omit<IEvent, 'id'>>({
    labels: [],
    date: eventDate ?? new Date().toISOString().slice(0, 10),
    value: '',
  });

  useEffect(
    () =>
      setInputValue({
        labels: [],
        date: eventDate ?? new Date().toISOString().slice(0, 10),
        value: '',
      }),
    [eventDate],
  );

  const labelHandleClick = useCallback(
    (label: ILabel) => {
      const index = inputValue.labels.findIndex((el: ILabel) => el.id === label.id);
      index === -1
        ? setInputValue((prev) => ({
            ...prev,
            labels: [...prev.labels, label],
          }))
        : setInputValue((prev) => ({ ...prev, labels: prev.labels.filter((el) => el.id !== label.id) }));
    },
    [inputValue.labels],
  );

  const onNameInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue((prev) => {
        if (error.value) {
          setError((prev) => ({ value: false, date: prev.date }));
        }
        return { ...prev, value: event.target.value };
      });
    },
    [error.value],
  );

  const onDateInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue((prev) => {
        if (error.date) {
          setError((prev) => ({ date: false, value: prev.value }));
        }
        return { ...prev, date: event.target.value };
      });
    },
    [error.date],
  );

  const onSubmit = () => {
    if (!inputValue.date || !inputValue.value) {
      setError({ value: !inputValue.value, date: !inputValue.date });
      return;
    }
    generateNewEvent(inputValue.labels, inputValue.value, inputValue.date);
    setInputValue({
      labels: [],
      date: eventDate,
      value: '',
    });
    modalRef.current?.close();
  };

  return (
    <CommonModal modalRef={modalRef}>
      <Container>
        <Header>Create new event</Header>
        <label>
          {error.value && 'Enter event name'}
          <Input value={inputValue.value} onChange={onNameInputChange} placeholder={'Enter name (required)'} />
        </label>
        <label>
          {error.date && 'Enter date'}
          <Input value={inputValue.date} onChange={onDateInputChange} type={'date'} />
        </label>
        <LabelContainer>
          {labels.map(({ description, id, color }) => (
            <PureLabelComponent
              handleClick={() => labelHandleClick({ description, id, color })}
              key={id}
              color={color}
              description={description}
              checked={!!inputValue.labels.find((el: ILabel) => el.id === id)}
            />
          ))}
        </LabelContainer>
        <ButtonContainer>
          <RejectButton onClick={() => modalRef.current?.close()}>Cancel</RejectButton>
          <Button onClick={onSubmit}>Create event</Button>
        </ButtonContainer>
      </Container>
    </CommonModal>
  );
};

export const EventUpdate: React.FC<CommonModalProps & { event: IEvent }> = ({ modalRef, event }) => {
  const { labels } = useLabels();
  const { updateEvent, deleteEvent } = useEvents();
  const [error, setError] = useState({ date: false, value: false });
  const [inputValue, setInputValue] = useState<Omit<IEvent, 'id'>>({
    labels: [],
    date: '',
    value: '',
  });

  useEffect(() => {
    setInputValue({ ...event });
  }, [event.date, event.value, event.id, event.labels]);

  const labelHandleClick = useCallback(
    (label: ILabel) => {
      const index = inputValue.labels.findIndex((el: ILabel) => el.id === label.id);
      index === -1
        ? setInputValue((prev) => ({
            ...prev,
            labels: [...prev.labels, label],
          }))
        : setInputValue((prev) => ({ ...prev, labels: prev.labels.filter((el) => el.id !== label.id) }));
    },
    [inputValue.labels],
  );

  const onNameInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue((prev) => {
        if (error.value) {
          setError((prev) => ({ value: false, date: prev.date }));
        }
        return { ...prev, value: event.target.value };
      });
    },
    [error.value],
  );

  const onDateInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue((prev) => {
        if (error.date) {
          setError((prev) => ({ date: false, value: prev.value }));
        }
        return { ...prev, date: event.target.value };
      });
    },
    [error.date],
  );

  const onSubmit = useCallback(() => {
    if (!inputValue.date || !inputValue.value) {
      setError({ value: !inputValue.value, date: !inputValue.date });
      return;
    }

    updateEvent(event, inputValue);
    modalRef.current?.close();
  }, [inputValue]);

  const deleteFunc = useCallback(() => {
    deleteEvent(event);
    modalRef.current?.close();
  }, [event]);

  return (
    <CommonModal modalRef={modalRef}>
      <Container>
        <Header>Update event</Header>
        <label>
          {error.value && 'Enter event name'}
          <Input value={inputValue.value} onChange={onNameInputChange} placeholder={'Enter name (required)'} />
        </label>
        <label>
          {error.date && 'Enter date'}
          <Input value={inputValue.date} onChange={onDateInputChange} type={'date'} />
        </label>
        <LabelContainer>
          {labels.map(({ description, id, color }) => (
            <PureLabelComponent
              handleClick={() => labelHandleClick({ description, id, color })}
              key={id}
              color={color}
              description={description}
              checked={!!inputValue.labels.find((el: ILabel) => el.id === id)}
            />
          ))}
        </LabelContainer>
        <ButtonContainer>
          <Button onClick={() => modalRef.current?.close()}>Cancel</Button>
          <AcceptButton onClick={onSubmit}>Update event</AcceptButton>
        </ButtonContainer>

        <DeleteText onClick={deleteFunc}>
          <BaseText>Delete</BaseText>
        </DeleteText>
      </Container>
    </CommonModal>
  );
};
