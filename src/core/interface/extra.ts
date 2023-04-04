import { DraggableLocation } from 'react-beautiful-dnd';
import React, { PropsWithChildren } from 'react';

export interface DnDActionProps {
  source: DraggableLocation;
  destination: DraggableLocation;
}

export interface CommonModalOnClick {
  open: () => void;
  close: () => void;
}

export interface CommonModalProps<T extends CommonModalOnClick = CommonModalOnClick> extends PropsWithChildren {
  modalRef: React.MutableRefObject<T | null>;
}
