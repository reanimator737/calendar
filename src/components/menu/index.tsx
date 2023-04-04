import React from 'react';
import { Button, LabelContainer, MenuContainer } from './style';
import { useLabels } from '../../context/LabelsContext';
import { LabelComponentWithControl } from '../base/label';
import { useModalWindowController } from '../../context/modalWindowController';
import { TextFilter } from './searchInput';

export const Menu: React.FC = () => {
  const { labels } = useLabels();
  const { labelCreate } = useModalWindowController();

  return (
    <MenuContainer>
      <LabelContainer>
        <Button onClick={() => labelCreate.current?.open()}>Create new label</Button>

        {labels.map((label) => (
          <LabelComponentWithControl key={label.id} {...label} />
        ))}
      </LabelContainer>
      <TextFilter />
    </MenuContainer>
  );
};
