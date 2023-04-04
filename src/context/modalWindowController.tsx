import React, { PropsWithChildren, useContext, useMemo, useRef, useState } from 'react';
import { LabelCreate, LabelUpdate } from '../components/modals/labelCreateAndUpdate';
import { EventCreate, EventUpdate } from '../components/modals/eventCreateAndUpdate';
import { ConfirmModal } from '../components/modals/confirm';
import { IEvent } from '../core/interface/events';
import { CommonModalOnClick } from '../core/interface/extra';

interface ContextProps {
  labelCreate: React.MutableRefObject<CommonModalOnClick | null>;
  labelUpdate: React.MutableRefObject<CommonModalOnClick | null>;
  eventUpdate: React.MutableRefObject<CommonModalOnClick | null>;
  eventCreate: React.MutableRefObject<CommonModalOnClick | null>;
  confirmWindow: React.MutableRefObject<CommonModalOnClick | null>;
  setModalEventDate: React.Dispatch<React.SetStateAction<string>>;
  setModalEventValue: React.Dispatch<React.SetStateAction<IEvent>>;
  setModalLabelId: React.Dispatch<React.SetStateAction<number>>;
  setOnClickConfirm: React.Dispatch<React.SetStateAction<() => void>>;
}

const Context = React.createContext<ContextProps>({
  labelCreate: { current: null },
  labelUpdate: { current: null },
  eventCreate: { current: null },
  eventUpdate: { current: null },
  confirmWindow: { current: null },
  setOnClickConfirm: () => undefined,
  setModalEventDate: () => undefined,
  setModalLabelId: () => undefined,
  setModalEventValue: () => undefined,
});

export const useModalWindowController = (): ContextProps => useContext(Context);

export const ModalWindowControlProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const labelCreate = useRef<CommonModalOnClick | null>(null);
  const labelUpdate = useRef<CommonModalOnClick | null>(null);
  const eventCreate = useRef<CommonModalOnClick | null>(null);
  const eventUpdate = useRef<CommonModalOnClick | null>(null);
  const confirmWindow = useRef<CommonModalOnClick | null>(null);
  const [modalEventDate, setModalEventDate] = useState<string>('');
  const [modalEventValue, setModalEventValue] = useState<IEvent>({ id: Infinity, value: '', date: '', labels: [] });
  const [modalLabelId, setModalLabelId] = useState<number>(Infinity);

  const [onClickConfirm, setOnClickConfirm] = useState<() => void>(() => undefined);

  const contextValue = useMemo<ContextProps>(
    () => ({
      labelCreate,
      labelUpdate,
      confirmWindow,
      eventCreate,
      setModalEventValue,
      setModalLabelId,
      setModalEventDate,
      setOnClickConfirm,
      eventUpdate,
    }),
    [],
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
      <LabelCreate modalRef={labelCreate} />
      <LabelUpdate modalRef={labelUpdate} id={modalLabelId} />
      <EventCreate modalRef={eventCreate} eventDate={modalEventDate} />
      <EventUpdate modalRef={eventUpdate} event={modalEventValue} />
      <ConfirmModal modalRef={confirmWindow} handleClick={onClickConfirm} />
    </Context.Provider>
  );
};
