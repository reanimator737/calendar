import React from 'react';
import { ArrowContainer, Container } from './style';
import { MONTH } from '../../../core/const';
import { Select } from '../../base/select';
import { ReactComponent as Arrow } from '../../../assets/rightArrow.svg';
import { useDate } from '../../../context/DateContext';

export const MonthPicker: React.FC = () => {
  const { goBackForMonth, goForwardForMonth, setMonth, month } = useDate();
  return (
    <Container>
      <Select options={MONTH} value={MONTH[month]} onChange={setMonth} />
      <ArrowContainer>
        <Arrow onClick={goBackForMonth} />
        <Arrow onClick={goForwardForMonth} />
      </ArrowContainer>
    </Container>
  );
};
