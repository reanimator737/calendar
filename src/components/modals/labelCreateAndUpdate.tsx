import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CommonModal } from '../base/commonModal';
import { ButtonContainer, Container } from './style';
import { HexColorPicker } from 'react-colorful';
import { useEvents } from '../context/EventsController';
import { getRandomColor } from '../../helpers';
import { useLabels } from '../context/LabelsContext';
import { CommonModalProps } from '../../interface/extra';
import { Header } from '../base/text/style';
import { Input } from '../base/inputs/style';
import { Button, RejectButton } from '../base/buttons/style';

export const LabelCreate: React.FC<CommonModalProps> = ({ modalRef }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState({ state: false, text: '' });
  const [color, setColor] = useState(getRandomColor());
  const { createNewLabel } = useLabels();

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.length > 10) {
        setInputValue(event.currentTarget.value);
        setError({
          state: true,
          text: 'too many characters',
        });
        return;
      }
      if (error.state) {
        setError({ state: false, text: '' });
      }
      setInputValue(event.currentTarget.value);
    },
    [error.state],
  );

  const onSave = useCallback(() => {
    if (error.state) {
      return;
    }

    if (!inputValue.length) {
      setError({ state: true, text: 'Enter label name' });
      return;
    }

    createNewLabel({ description: inputValue, color: color });
    setInputValue('');
    setColor(getRandomColor());
    modalRef.current?.close();
  }, [error.state, inputValue]);

  return (
    <CommonModal modalRef={modalRef}>
      <Container>
        <Header>Create new label</Header>
        <label>
          {error.text}
          <Input
            placeholder={'Enter label name'}
            value={inputValue}
            onChange={onInputChange}
            className={error.state ? 'error' : ''}
          />
        </label>
        <HexColorPicker color={color} onChange={setColor} />
        <ButtonContainer>
          <RejectButton onClick={() => modalRef.current?.close()}>Cancel</RejectButton>
          <Button onClick={onSave}>Create new</Button>
        </ButtonContainer>
      </Container>
    </CommonModal>
  );
};

export const LabelUpdate: React.FC<CommonModalProps & { id: number }> = ({ modalRef, id }) => {
  const { labels, updateLabel } = useLabels();
  //TODO
  const { updateLabelList } = useEvents();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState({ state: false, text: '' });
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    const { color, description } = labels.find((el) => el.id === id) ?? { color: '', description: '' };
    setColor(color);
    setInputValue(description);
  }, [id]);

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.length > 15) {
        setInputValue(event.currentTarget.value);
        setError({
          state: true,
          text: 'too many characters',
        });
        return;
      }
      if (error.state) {
        setError({ state: false, text: '' });
      }
      setInputValue(event.currentTarget.value);
    },
    [error.state],
  );

  const onSave = useCallback(() => {
    if (error.state) {
      return;
    }

    if (!inputValue.length) {
      setError({ state: true, text: 'Enter label name' });
      return;
    }

    updateLabel({ id, color, description: inputValue });
    updateLabelList({ id, color, description: inputValue });
    modalRef.current?.close();
  }, [error.state, inputValue, color]);
  return (
    <CommonModal modalRef={modalRef}>
      <Container>
        <Header>Update label</Header>
        <label>
          {error.text}
          <Input
            placeholder={'Enter label name'}
            value={inputValue}
            onChange={onInputChange}
            className={error.state ? 'error' : ''}
          />
        </label>
        <HexColorPicker color={color} onChange={setColor} />
        <ButtonContainer>
          <RejectButton onClick={() => modalRef.current?.close()}>Cancel</RejectButton>
          <Button onClick={onSave}>Update</Button>
        </ButtonContainer>
      </Container>
    </CommonModal>
  );
};
