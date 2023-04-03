import React from 'react';
import { Container, LoadComp } from './style';

export const Loader: React.FC = () => {
  return (
    <Container>
      <LoadComp delay={0} />
      <LoadComp delay={500} />
      <LoadComp delay={1000} />
    </Container>
  );
};
