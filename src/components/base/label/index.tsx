import React, { useCallback } from 'react';
import { CheckBox, Container, Icon, PureContainer, Square } from './style';
import { ILabel } from '../../../interface/labels';
import { useEvents } from '../../context/EventsController';
import { useFilters } from '../../context/FiltersContext';
import { useModalWindowController } from '../../context/modalWindowController';
import { useLabels } from '../../context/LabelsContext';

export const PureLabelComponent: React.FC<Omit<ILabel, 'id'> & { checked: boolean; handleClick: () => void }> = ({
  description,
  color,
  handleClick,
  checked,
}) => {
  return (
    <PureContainer onClick={handleClick}>
      <CheckBox>
        <Square bgColor={color} checked={checked}>
          {checked ? '✔' : ''}
        </Square>
        {description}
      </CheckBox>
    </PureContainer>
  );
};

export const LabelComponentWithControl: React.FC<ILabel> = ({ description, color, id }) => {
  const { labelUpdate, setModalLabelId, setOnClickConfirm, confirmWindow } = useModalWindowController();
  const { labelsFilter, labelClick } = useFilters();
  const { removeLabel } = useLabels();
  const { removeLabelFromList } = useEvents();

  const confirmTriggerFunction = useCallback(() => {
    removeLabel(id);
    removeLabelFromList(id);
    confirmWindow.current?.close();
  }, [id, confirmWindow.current]);

  const onGarbageClick = () => {
    confirmWindow.current?.open();
    setOnClickConfirm(() => confirmTriggerFunction);
  };

  const updateIconClick = () => {
    setModalLabelId(id);
    labelUpdate.current?.open();
  };

  return (
    <Container>
      <CheckBox onClick={() => labelClick(id)}>
        <Square bgColor={color} checked={!labelsFilter.includes(id)}>
          {!labelsFilter.includes(id) ? '✔' : ''}
        </Square>
        {description}
      </CheckBox>
      <Icon className="icon" onClick={updateIconClick}>
        ✎
      </Icon>
      <Icon className="icon" onClick={onGarbageClick}>
        🗑
      </Icon>
    </Container>
  );
};
