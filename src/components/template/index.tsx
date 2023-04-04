import React from 'react';
import { Container } from './style';
import { Menu } from '../menu';
import { MonthContainer } from '../monthContainer';
import { Header } from '../header';

export const Template: React.FC = () => {
  return (
    <Container>
      <Header />
      <Menu />
      <MonthContainer />
    </Container>
  );
};
