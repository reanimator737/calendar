import React from 'react';
import { Container } from './style';
import { Menu } from '../menu';
import { MonthContainer } from '../monthContainer';
import { DatePicker } from '../datePicker';

export const Template: React.FC = () => {
  return (
    <Container>
      <DatePicker />
      <Menu />
      <MonthContainer />
    </Container>
  );
};
