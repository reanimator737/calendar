import React, { useMemo } from 'react';
import { Container, Label, LabelRow } from './style';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useModalWindowController } from '../../context/modalWindowController';
import { IEvent } from '../../core/interface/events';
import { useFilters } from '../../context/FiltersContext';
import { BaseText } from '../base/text/style';

export const Event: React.FC<IEvent & { provided: DraggableProvided }> = ({ id, date, value, labels, provided }) => {
  const { setModalEventValue, eventUpdate } = useModalWindowController();
  const { labelsFilter, textFilter } = useFilters();

  const labelsFilterTest = useMemo(() => {
    if (labels.length === 0) {
      return true;
    }
    for (let label of labels) {
      if (labelsFilter.includes(label.id)) {
        return false;
      }
    }
    return true;
  }, [labelsFilter, labels]);

  const textFilterTest = useMemo(() => {
    return value.includes(textFilter);
  }, [value, textFilter]);

  const onContainerClick = () => {
    setModalEventValue({ value, labels, date, id });
    eventUpdate.current?.open();
  };

  return (
    <Container
      className={labelsFilterTest && textFilterTest ? 'visible' : ''}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={onContainerClick}
    >
      <LabelRow>
        {labels.map(({ id, color }) => (
          <Label key={id} background={color} />
        ))}
      </LabelRow>
      <BaseText>{value}</BaseText>
    </Container>
  );
};
